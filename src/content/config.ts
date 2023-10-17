import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
   schema: ({ image }) => z.object({
      title: z.string().min(20).max(100),
      excerpt: z.string().min(50).max(90),
      tags: z.array(z.string()).min(1).max(4),
      category: z.string(),
      is_private: z.boolean().optional(),
      is_portfolio: z.boolean().optional(),
      portfolio_url: z.string().optional(),
      author: z.string().min(5).max(50),
      date: z.date(),
      featured_post: z.boolean().optional(),
      featured_image: z.object({
         src: image().refine((img) => img.width >= 200 && img.height >= 200, {
            message: 'Cover image must be at least 200 pixels wide and 200 pixels tall!',
         }),
         alt: z.string(),
      }),
   }),
});

const portfolio = defineCollection({
   schema: ({ image }) => z.object({
      title: z.string().min(20).max(100),
      excerpt: z.string().min(50).max(90),
      tags: z.array(z.string()).min(1).max(4),
      category: z.string(),
      author: z.string().min(5).max(50),
      date: z.date(),
      github_project_link: z.string().optional(),
      demo_link: z.string().optional(),
      video_link: z.string().optional(),
      featured_portfolio: z.boolean().optional(),
      featured_image: z.object({
         src: image().refine((img) => img.width >= 200 && img.height >= 200, {
            message: 'Cover image must be at least 200 pixels wide and 200 pixels tall!',
         }),
         alt: z.string(),
      }),
   }),
});

export const collections = { blog, portfolio };