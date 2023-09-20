import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
   site: 'http://localhost:4321/',
   integrations: [partytown(), sitemap(), mdx(), purgecss()]
});