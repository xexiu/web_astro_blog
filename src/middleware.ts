import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(
   (context, next) => {
      const isAdmin = context.cookies.get('isAdmin') || '' as any;

      context.cookies.set('isAdmin', isAdmin, { domain: '.xexiu.netlify.app' });

      if(isAdmin && isAdmin.value) {
         context.cookies.set('isAdmin', 'true', { domain: '.xexiu.netlify.app' });
      }

      return next();
   });