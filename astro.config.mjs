import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import NetlifyCMS from 'astro-netlify-cms';
import purgecss from 'astro-purgecss';
import { defineConfig, squooshImageService } from 'astro/config';


// https://astro.build/config
export default defineConfig({
   publicDir: new URL('./public', import.meta.url).toString(),
   site: 'http://xexiu.netlify.app',
   integrations: [
      partytown(),
      sitemap(),
      purgecss(),
      mdx(),
      NetlifyCMS({
         config: {
            backend: {
               name: 'git-gateway',
               branch: 'main',
            },
            media_folder: 'src/images',
            public_folder: '/src/images',
            site_url: 'https://xexiu.netlify.app',
            display_url: 'https://xexiu.netlify.app',
            logo_url: 'https://xexiu.netlify.app/logo.svg',
            show_preview_links: true,
            collections: [
               {
                  name: 'blog',
                  label: 'Blog Posts',
                  folder: 'src/content/blog',
                  create: true,
                  delete: true,
                  slug: '{{slug}}',
                  preview_path: 'blog/{{slug}}',
                  fields: [
                     { name: 'title', widget: 'string', label: 'Post Title' },
                     { label: 'Publish Date', name: 'date', widget: 'datetime' },
                     { label: 'Category', name: 'category', widget: 'string' },
                     { label: 'Excerpt', name: 'excerpt', widget: 'string' },
                     { label: 'Author', name: 'author', widget: 'string' },
                     { name: 'body', widget: 'markdown', label: 'Post Body' },
                     { label: 'Featured Post', name: 'featured_post', widget: 'boolean' },
                     { label: 'Tags', name: 'tags', widget: 'list' },
                     {
                        'label': 'Featured Image',
                        'name': 'featured_image',
                        'widget': 'object',
                        'fields': [
                           {
                              'name': 'src',
                              'label': 'Image',
                              'widget': 'image'
                           },
                           {
                              'name': 'alt',
                              'label': 'Alt text',
                              'widget': 'string'
                           }
                        ]
                     }
                  ],
               },
            ],
         },
         previewStyles: ['/src/styles/blog.css']
      })
   ],
   image: {
      service: squooshImageService()
   }
});