import { setCookie } from '@js/utils';

export function netlifyIdentityLoad(identity: any) {
   identity.on('init', (user: any) => {
      if (!user) {
         identity.on('login', () => {
            localStorage.setItem('isAdmin', 'true');
            setCookie('isAdmin', 'true', 30);
            document.location.href = '/admin/';
         });
      } else {
         identity.on('logout', () => {
            localStorage.setItem('isAdmin', 'false');
            setCookie('isAdmin', 'false', 30);
            document.location.href = '/admin/';
         });
      }
   });

   identity.on('error', (err) => {
      localStorage.setItem('isAdmin', 'false');
      setCookie('isAdmin', 'false', 30);
      // eslint-disable-next-line no-console
      console.log('CMS Identity', err);
   });

   identity.init();
}