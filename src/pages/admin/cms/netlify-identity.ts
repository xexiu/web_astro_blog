export function netlifyIdentityLoad(identity: any) {
   identity.on('init', (user: any) => {
      if (!user) {
         identity.on('login', () => {
            document.location.href = '/admin/';
         });
      } else {
         identity.on('logout', () => {
            document.location.href = '/admin/';
         });
      }
   });

   identity.init();
}