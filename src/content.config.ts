import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const software = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/software' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    github: z.string(),
    paper: z.boolean().default(false),
    contributed: z.boolean().default(false),
    relatedPapers: z.array(z.object({
      title: z.string(),
      authors: z.string(),
      journal: z.string(),
      year: z.string(),
      url: z.string().optional(),
    })).default([]),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    software: z.string().optional(),
  }),
});

export const collections = { blog, software };
