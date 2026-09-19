/**
 * Cloudflare Worker for obuyisibwomuinitiative.org.
 *
 * Static pages are served directly from ./dist (see wrangler.jsonc). This Worker only runs for /api/* and
 * handles the site's three forms (volunteer/intern applications, story competition, newsletter sign-up),
 * saving each submission to the SUBMISSIONS KV namespace.
 *
 * Read submissions with:
 *   npx wrangler kv key list --binding SUBMISSIONS --remote --prefix volunteer:
 *   npx wrangler kv key get --binding SUBMISSIONS --remote "<key>"
 * or in the Cloudflare dashboard: Storage & Databases → KV → SUBMISSIONS.
 */

interface Env {
  ASSETS: Fetcher;
  SUBMISSIONS?: KVNamespace;
}

type FormSpec = { required: string[]; optional: string[]; maxLengths?: Record<string, number> };

const FORMS: Record<string, FormSpec> = {
  volunteer: {
    required: ['role', 'name', 'email', 'country', 'message'],
    optional: ['phone'],
    maxLengths: { message: 5000 },
  },
  story: {
    required: ['name', 'email', 'age', 'level', 'title', 'story', 'license'],
    optional: ['school'],
    maxLengths: { title: 20, story: 20000 },
  },
  newsletter: {
    required: ['email'],
    optional: ['firstName', 'lastName'],
  },
};

const DEFAULT_MAX_LENGTH = 500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/submit' || url.pathname === '/api/submit/') {
      if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
      return handleSubmit(request, env, url);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleSubmit(request: Request, env: Env, url: URL): Promise<Response> {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/x-www-form-urlencoded') && !contentType.includes('multipart/form-data')) {
    return errorPage(415, 'Unsupported form encoding.');
  }
  // Reject cross-site posts (browsers always send Origin on form POSTs).
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== url.host) return errorPage(403, 'Forbidden.');

  const data = await request.formData();
  const formName = String(data.get('form') ?? '');
  const spec = FORMS[formName];
  if (!spec) return errorPage(400, 'Unknown form.');

  const thankYou = new URL(`/thank-you/?form=${formName}`, url).toString();

  // Honeypot: real people never fill the hidden "website" field. Pretend it worked.
  if (String(data.get('website') ?? '').trim() !== '') return Response.redirect(thankYou, 303);

  const fields: Record<string, string> = {};
  for (const key of [...spec.required, ...spec.optional]) {
    const value = String(data.get(key) ?? '').trim();
    const max = spec.maxLengths?.[key] ?? DEFAULT_MAX_LENGTH;
    if (value.length > max) return errorPage(400, `The "${key}" field is too long (maximum ${max} characters).`);
    if (spec.required.includes(key) && !value) return errorPage(400, `Please fill in the "${key}" field.`);
    if (value) fields[key] = value;
  }
  if (!EMAIL_RE.test(fields.email ?? '')) return errorPage(400, 'Please enter a valid email address.');

  if (!env.SUBMISSIONS) {
    console.error('SUBMISSIONS KV namespace is not bound; submission not stored', { form: formName });
    return errorPage(503, 'Our forms are being set up. Please try again later, or reach us on social media.');
  }

  const submittedAt = new Date().toISOString();
  const record = {
    form: formName,
    submittedAt,
    fields,
    country: request.cf?.country ?? null,
  };
  // Key sorts chronologically within each form, e.g. "story:2026-09-19T10:00:00.000Z:1a2b3c".
  const key = `${formName}:${submittedAt}:${crypto.randomUUID().slice(0, 8)}`;
  await env.SUBMISSIONS.put(key, JSON.stringify(record), {
    metadata: { name: fields.name ?? [fields.firstName, fields.lastName].filter(Boolean).join(' '), email: fields.email },
  });

  return Response.redirect(thankYou, 303);
}

function errorPage(status: number, message: string): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Something went wrong | Obuyisi bw'Omu Initiative</title>
<style>body{font-family:system-ui,sans-serif;background:#fffdf9;color:#1e1826;display:grid;place-items:center;min-height:100vh;margin:0;padding:1rem}
main{max-width:34rem;text-align:center}h1{color:#2d1447}a{display:inline-block;margin-top:1rem;padding:.8rem 1.4rem;border-radius:999px;background:#522881;color:#fff;text-decoration:none;font-weight:600}</style></head>
<body><main><h1>We couldn't send your form</h1><p>${escapeHtml(message)}</p><a href="javascript:history.back()">Go back</a></main></body></html>`;
  return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
