import { slugify } from '@js/utils';
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
      entry.data.tags = entry.data.tags.map((tag) => slugify(tag));

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
