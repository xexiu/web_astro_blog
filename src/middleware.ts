import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(
   (context, next) => {
      const isAdmin = context.cookies.get('isAdmin') || '';

      if(isAdmin && isAdmin.value) {
         context.cookies.set('isAdmin', 'true', { domain: '.xexiu.netlify.app' });
      }

      if(isAdmin) {
         context.cookies.set('isAdmin', 'true', { domain: '.xexiu.netlify.app' });
      }

      return next();
   });