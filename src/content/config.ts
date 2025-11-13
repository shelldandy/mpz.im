import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    hero: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
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
    route: z.string().optional(),
    hero: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
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
