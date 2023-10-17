import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(
   (context, next) => {
      const isAdmin = context.cookies.get('isAdmin') || 'test';
      context.locals.isAdmin = isAdmin;

      if(isAdmin && isAdmin.value) {
         context.cookies.set('isAdmin', 'true');

      }

      return next();
   });