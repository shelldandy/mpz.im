import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    layout: z.string().default('Post'),
    hero: z.string().optional(),
    // Legacy WordPress fields (optional)
    author: z.string().optional(),
    comments: z.boolean().optional(),
    link: z.string().optional(),
    slug: z.string().optional(),
    wordpress_id: z.number().optional(),
    categories: z.array(z.string()).optional(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    layout: z.string(),
    route: z.string().optional(),
    hero: z.string().optional(),
    cta: z.object({
      label: z.string(),
      link: z.string(),
    }).optional(),
  }),
});

export const collections = {
  posts,
  pages,
};
