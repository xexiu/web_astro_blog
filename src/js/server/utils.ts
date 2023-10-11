import type { Blog } from 'types/utils';

export async function getCollectionFor(collectionName: string, isAdmin: boolean, serverFunction: Function) {
   const blogs: Blog = {
      latest: [],
      pinned: [],
      private: []

   };
   await serverFunction(collectionName, (entry) => {
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