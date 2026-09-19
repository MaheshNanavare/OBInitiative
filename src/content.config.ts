import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts ("Our Stories"). Each Markdown file's name becomes its URL, e.g.
// src/content/stories/meet-and-know-muzeyi-ashraf.md -> /meet-and-know-muzeyi-ashraf/
// (the same URLs the WordPress site used).
const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      excerpt: z.string(),
      cover: image(),
      coverAlt: z.string(),
      category: z.enum(['Mental Health', 'Education', 'Livelihoods', 'W.A.S.H', 'Climate']),
    }),
});

export const collections = { stories };
