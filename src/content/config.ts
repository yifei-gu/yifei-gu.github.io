import { defineCollection, z } from 'astro:content';

const software = defineCollection({
  type: 'content',
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
  }),
});

export const collections = { 
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      image: z.string().optional(),
      software: z.string().optional(),
    }),
  }),
  software
};
