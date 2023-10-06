import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import { defineConfig, squooshImageService } from 'astro/config';

import preact from "@astrojs/preact";

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
  integrations: [partytown(), sitemap(), purgecss(), mdx(), preact()],
  image: {
    service: squooshImageService()
  }
});