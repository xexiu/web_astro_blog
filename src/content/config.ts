import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
   schema: ({ image }) => z.object({
      title: z.string().max(100),
      description: z.string(),
      tags: z.array(z.string()),
      category: z.string(),
      author: z.string(),
      date: z.date(),
      featured_post: z.boolean(),
      featured_image: z.object({
         src: image().refine((img) => img.width >= 600 && img.height >= 400, {
            message: 'Cover image must be at least 600 pixels wide and 400 pixels tall!',
         }),
         alt: z.string(),
      }),
   }),
});

export const collections = { blog };