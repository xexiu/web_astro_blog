import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import { defineConfig, squooshImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
   vite: {
      server: {
         watch: {
            ignored: ['**/.history/**']
         }
      }
   },
   site: 'http://xexiu.netlify.app',
   integrations: [
      partytown(),
      sitemap(),
      purgecss(),
      mdx()
   ],
   image: {
      service: squooshImageService()
   }
});