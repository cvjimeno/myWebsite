// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    heroImage: z.string(), 
    imageAlt: z.string(),
    readingTime: z.number(), // Made it required for consistency, remove .optional()
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};