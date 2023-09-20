import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
   site: 'https://candid-malabi-159d6f.netlify.app',
   integrations: [partytown(), sitemap(), mdx(), purgecss()]
});