import { defineMiddleware } from 'astro:middleware';
export const prerender = false; //ADDED LINE

export const onRequest = defineMiddleware((context, next) => {
   const isAdmin = context.cookies.get('isAdmin') || '' as any;

   // context.cookies.set('isAdmin', isAdmin, { domain: '.xexiu.netlify.app' });

   if (isAdmin && isAdmin.value) {
      context.cookies.set('isAdmin', 'true', { domain: '.xexiu.dev' });
   }

   if (isAdmin) {
      context.cookies.set('isAdmin', 'true', { domain: '.xexiu.dev' });
   }

   context.locals.isAdmin = isAdmin;

   return next();
});
