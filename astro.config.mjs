import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import { defineConfig, squooshImageService } from 'astro/config';
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
   output: 'server',
   vite: {
      server: {
         watch: {
            ignored: ['**/.history/**']
         }
      }
   },
   site: 'http://xexiu.netlify.app',
   integrations: [partytown(), sitemap(), purgecss()],
   image: {
      service: squooshImageService()
   },
   adapter: netlify()
});