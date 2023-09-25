import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import NetlifyCMS from 'astro-netlify-cms';
import purgecss from 'astro-purgecss';
import { defineConfig, passthroughImageService } from 'astro/config';


// https://astro.build/config
export default defineConfig({
   site: 'https://xexiu.netlify.app',
   integrations: [partytown(), sitemap(), purgecss(), mdx(), NetlifyCMS({
      config: {
         backend: {
            name: 'git-gateway',
            branch: 'main',
         },
         media_folder: 'src/images',
         public_folder: '/src/images',
         collections: [
            {
               name: 'posts',
               label: 'Blog Posts',
               folder: 'src/content/blog',
               create: true,
               delete: true,
               fields: [
                  { name: 'title', widget: 'string', label: 'Post Title' },
                  { name: 'body', widget: 'markdown', label: 'Post Body' },
               ],
            }
         ],
      },
   })],
   image: {
      service: passthroughImageService()
   }
});