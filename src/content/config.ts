// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Define our primary categories. This is the single source of truth.
const CATEGORIES = [
  'IA', 'Tecnología', 'Productividad', 'Aprendizaje', 'Reflexión', 'Herramientas', 'Programación', 'Ética'
] as const;

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    heroImage: z.string(), 
    imageAlt: z.string(),
    readingTime: z.number(),
    draft: z.boolean().optional(),
    // NEW: A single, required category from our list.
    category: z.enum(CATEGORIES),
    // OLD: 'tags' is now for secondary keywords. Optional.
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};