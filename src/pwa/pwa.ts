import { registerSW } from 'virtual:pwa-register';

registerSW({
   immediate: true,
   onRegisteredSW(swScriptUrl) {
      if(!import.meta.env.PROD) {
         // eslint-disable-next-line no-console
         console.log('SW registered: ', swScriptUrl);
      }
   },
   onOfflineReady() {
      if(!import.meta.env.PROD) {
         // eslint-disable-next-line no-console
         console.log('PWA application ready to work offline');
      }
   },
});