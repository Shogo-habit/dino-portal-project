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

const dinosaursCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/dinosaurs" }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    kana: z.string(),
    scientificName: z.string(),
    era: z.string(),
    region: z.string(),
    diet: z.string(),
    length: z.string(),
    weight: z.string(),
    image: z.string(),
    group: z.string(),
    bioTraits: z.array(z.object({
      trait: z.string(),
      value: z.string(),
      detail: z.string(),
    })).default([]),
    cyberMetadata: z.object({
      bottomGap: z.number(),
      realHeight: z.number(),
      realLength: z.number(),
      contentHeightPx: z.number(),
      sourceRes: z.number(),
      dinoLeft: z.string().optional(),
      refRight: z.string().optional(),
      zoom: z.number(),
    }).optional(),
    references: z.array(z.object({
      title: z.string(),
      journal: z.string(),
      year: z.number(),
      url: z.string(),
    })).default([]),
  })
});

export const collections = {
  'topics': topicsCollection,
  'dinosaurs': dinosaursCollection,
};
