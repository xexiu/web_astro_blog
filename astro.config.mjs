import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import { defineConfig, squooshImageService } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
   output: 'hybrid',
   vite: {
      server: {
         watch: {
            ignored: ['**/.history/**']
         }
      }
   },
   site: 'http://xexiu.netlify.app',
   integrations: [partytown(), sitemap(), purgecss(), AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest: {
         name: 'Xexiu Dev',
         short_name: 'Xe',
         description: 'Full Stack, JavaScript, HTML, CSS, Node.js, Python, React, React Native, Blockchain, WEB3, dApps, smart contracts y más.',
         theme_color: '#212129',
         background_color: '#ffffff',
         icons: [
            {
               src: 'icon-96x96.png',
               sizes: '96x86',
               type: 'image/png',
            },
            {
               src: 'icon-72x72.png',
               sizes: '72x62',
               type: 'image/png',
            },
            {
               src: 'favicon.svg',
               sizes: '32x32',
               type: 'image/svg',
               purpose: 'any maskable',
            },
         ],
      },
      client: {
         installPrompt: true,
         periodicSyncForUpdates: 20,
      },
      devOptions: {
         enabled: true,
      },
   })],
   image: {
      service: squooshImageService()
   },
   adapter: netlify({
      edgeMiddleware: true
   })
});