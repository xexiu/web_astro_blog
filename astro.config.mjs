import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
   site: 'https://candid-malabi-159d6f.netlify.app',
   integrations: [partytown(), sitemap(), purgecss()],
   image: {
      service: passthroughImageService(),
   },
});