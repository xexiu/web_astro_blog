import type { AstroIntegration, AstroUserConfig } from 'astro';
import type { CmsConfig } from 'netlify-cms-core';
import { spawn } from 'node:child_process';
import type { PreviewStyle } from './types.js';
import AdminDashboard from './vite-plugin-admin-dashboard.js';

interface NetlifyCMSOptions {
    /**
     * Path at which the Netlify CMS admin dashboard should be served.
     * @default '/admin'
     */
    adminPath?: string;
    config: Omit<CmsConfig, 'load_config_file' | 'local_backend'>;
    disableIdentityWidgetInjection?: boolean;
    previewStyles?: PreviewStyle[];
}

export default function NetlifyCMS({
   adminPath = '/admin',
   config: cmsConfig,
   previewStyles = [],
}: NetlifyCMSOptions) {

   if (!adminPath.startsWith('/')) {
      throw new Error(
         '`adminPath` option must be a root-relative pathname, starting with "/", got "' +
            adminPath +
            '"'
      );
   }

   let proxy: ReturnType<typeof spawn>;

   const NetlifyCMSIntegration: AstroIntegration = {
      name: 'netlify-cms',
      hooks: { 'astro:config:setup': ({ config, injectRoute, updateConfig }) => {
         const newConfig: AstroUserConfig = {
            // Default to the URL provided by Netlify when building there. See:
            // https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
            site: config.site || process.env.URL,
            vite: {
               plugins: [
                  ...(config.vite?.plugins || []),
                  AdminDashboard({
                     config: cmsConfig,
                     previewStyles,
                     identityWidget: '',
                  }),
               ],
            },
         };
         updateConfig(newConfig);

         injectRoute({
            pattern: adminPath,
            entryPoint: './integration/admin-dashboard.astro',
         });
      },

      'astro:server:start': () => {
         proxy = spawn('netlify-cms-proxy-server', {
            stdio: 'inherit',
            // Run in shell on Windows to make sure the npm package can be found.
            shell: process.platform === 'win32',
         });
         process.on('exit', () => proxy.kill());
      },

      'astro:server:done': () => {
         proxy.kill();
      },
      },
   };

   return NetlifyCMSIntegration;
}