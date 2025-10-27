// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    imgSrc: z.string(),
    imgAlt: z.string(),
    githubUrl: z.string(),
    tags: z.array(z.string()),
  }),
});

// 1. AÑADE ESTA NUEVA COLECCIÓN
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(), // Fecha de publicación
    heroImage: z.string().optional(), // Una imagen opcional
  }),
});

export const collections = {
  'projects': projectsCollection,
  'blog': blogCollection, // 2. AÑÁDELA AQUÍ
};