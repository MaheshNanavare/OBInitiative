// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://obuyisibwomuinitiative.org',
  // The WordPress site used trailing slashes; keep the same URLs so existing links keep working.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/thank-you/') }),
  ],
});
