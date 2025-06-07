// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // or 'data' if you were using JSON/YAML
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    featuredImage: z.string(), // Or use image() helper if images are in same folder
    imageAlt: z.string(),
    readingTime: z.number().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};