import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: z.object({
    title: z.string().optional().default('Untitled'),
    date: z.coerce.date(),
    published: z.boolean().default(false),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { posts };
