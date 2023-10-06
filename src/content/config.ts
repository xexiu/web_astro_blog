import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
   schema: ({ image }) => z.object({
      title: z.string().max(100),
      excerpt: z.string().min(90),
      tags: z.array(z.string()).min(1).max(4),
      category: z.string(),
      is_private: z.boolean().optional(),
      author: z.string(),
      date: z.date(),
      featured_post: z.boolean().optional(),
      featured_image: z.object({
         src: image().refine((img) => img.width >= 600 && img.height >= 400, {
            message: 'Cover image must be at least 600 pixels wide and 400 pixels tall!',
         }),
         alt: z.string(),
      }),
   }),
});

const portfolio = defineCollection({
   schema: ({ image }) => z.object({
      title: z.string().max(100),
      tags: z.array(z.string()),
      category: z.string(),
      author: z.string(),
      date: z.date(),
      github_project_link: z.string(),
      demo_link: z.string().optional(),
      video_link: z.string().optional(),
      featured_portfolio: z.boolean(),
      featured_image: z.object({
         src: image().refine((img) => img.width >= 600 && img.height >= 400, {
            message: 'Cover image must be at least 600 pixels wide and 400 pixels tall!',
         }),
         alt: z.string(),
      }),
   }),
});

export const collections = { blog, portfolio };