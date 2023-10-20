export const prerender = false; // Need for Astro.cookie in PROD

import type { Blog, Post } from 'types/utils';

export async function getCollectionFor(collectionName: string, isAdmin: boolean, serverFunction: Function): Promise<any> {
   switch(collectionName) {
   case 'blog':
      return await buildWithBlogs(isAdmin, serverFunction);
   default:
      return await serverFunction(collectionName);
   }

}

export async function buildWithBlogs(isAdmin: boolean, serverFunction: Function): Promise<Blog> {
   const blogs: Blog = {
      latest: [],
      pinned: [],
      private: []

   };

   await serverFunction('blog', (entry: Post) => {
      if(!entry.data.featured_post && !entry.data.is_private) {
         blogs.latest.push(entry);
      } else if(entry.data.is_private) {
         isAdmin && blogs.private.push(entry);
      } else if(entry.data.featured_post) {
         blogs.pinned.push(entry);
      }
   });

   return blogs;
}

export function isUserAdminCookie(cookies: any): boolean {
   return /isAdmin=true/.test(cookies);
}
