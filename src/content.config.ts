import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const topicsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/topics" }),
  schema: z.object({
    id: z.string(),
    date: z.string(),
    category: z.string(),
    title: z.string(),
    summary: z.string(),
    image: z.string(),
    securityLevel: z.string().optional(),
    relatedSpecimens: z.array(z.string()).default([]),
  })
});

export const collections = {
  'topics': topicsCollection,
};
