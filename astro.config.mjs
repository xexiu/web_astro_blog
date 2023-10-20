import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import { defineConfig, squooshImageService } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import AstroPWA from '@vite-pwa/astro';
import { manifest } from './src/pwa/manifest';

// https://astro.build/config
export default defineConfig({
   output: 'hybrid',
   vite: {
      logLevel: 'info',
      define: {
         __DATE__: `'${new Date().toISOString()}'`,
      },
      server: {
         watch: {
            ignored: ['**/.history/**']
         }
      }
   },
   site: 'https://xexiu.netlify.app',
   integrations: [partytown(), sitemap(), purgecss(), AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      mode: 'production',
      base: '/',
      manifest,
      client: {
         installPrompt: true,
         periodicSyncForUpdates: 20,
      },
      workbox: {
         maximumFileSizeToCacheInBytes: 3000000,
         cleanupOutdatedCaches: true,
         navigateFallback: null,
         navigateFallbackDenylist: [/\/[api,admin,rss,tags,author,category,rss.xml]+\/.*/],
         globPatterns: ['**/*.{css,js,html,svg,png,jpg,jpeg,gif,ico,txt,webp,woff,woff2,ttf,eot}']
      },
      devOptions: {
         enabled: true,
         navigateFallbackAllowlist: [/^\/404$/],
      },
   })],
   image: {
      service: squooshImageService()
   },
   adapter: netlify()
});