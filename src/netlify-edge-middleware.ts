import type { Context } from 'https://edge.netlify.com';

export default function({ request, context }: { request: Request; context: Context }) {
   const isAdmin = context.cookies?.get('isAdmin');

   if(isAdmin && isAdmin.value) {
      context.cookies.set('isAdmin', 'true');

   }

   return {
      visitorCountry: context.geo.country.name,
      isAdmin,
      hasEdgeMiddleware: true,
   };
}