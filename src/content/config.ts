import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
   schema: ({ image }) => z.object({
      title: z.string().refine(
         (value) => value.length >= 20 && value.length <= 100,
         {
            message: 'Title must have more or equal 50 characters and at most 100 characters'
         }
      ),
      excerpt: z.string().refine(
         (value) => value.length >= 50 && value.length <= 150,
         {
            message: 'Excerpt must have more or equal 50 characters and at most 150 characters'
         }
      ),
      tags: z.array(z.string()).min(1).max(4),
      category: z.string().max(100),
      is_private: z.boolean().optional(),
      is_portfolio: z.boolean().optional(),
      portfolio_url: z.string().max(100).optional(),
      author: z.string().refine(
         (value) => value.length >= 5 && value.length <= 50,
         {
            message: 'Author must have more or equal than 5 characters and at most 50 characters'
         }
      ),
      date: z.date(),
      featured_post: z.boolean().optional(),
      featured_image: z.object({
         src: image().refine((img) => img.width >= 200 && img.height >= 200, {
            message: 'Cover image must be at least 200 pixels wide and 200 pixels tall!'
         }),
         alt: z.string()
      })
   })
});

const portfolio = defineCollection({
   schema: ({ image }) => z.object({
      title: z.string().refine(
         (value) => value.length >= 20 && value.length <= 100,
         {
            message: 'Title must have more or equal 50 characters and at most 100 characters'
         }
      ),
      excerpt: z.string().refine(
         (value) => value.length >= 50 && value.length <= 150,
         {
            message: 'Excerpt must have more or equal 50 characters and at most 150 characters'
         }
      ),
      tags: z.array(z.string()).min(1).max(4),
      category: z.string(),
      author: z.string().refine(
         (value) => value.length >= 5 && value.length <= 50,
         {
            message: 'Author must have more or equal than 5 characters and at most 50 characters'
         }
      ),
      date: z.date(),
      github_project_link: z.string().max(100).optional(),
      demo_link: z.string().max(100).optional(),
      video_link: z.string().max(100).optional(),
      featured_portfolio: z.boolean().optional(),
      featured_image: z.object({
         src: image().refine((img) => img.width >= 200 && img.height >= 200, {
            message: 'Cover image must be at least 200 pixels wide and 200 pixels tall!'
         }),
         alt: z.string()
      })
   })
});

export const collections = { blog, portfolio };
