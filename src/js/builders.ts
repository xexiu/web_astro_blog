import { findRelatedPostsByTag, isUserAdmin, slugify, unslugify } from './utils';
import type { Blog, Post, PostFor, PostNullable } from 'types/utils';

type BasePost = {
   post: Post,
   unslugifiedPostTags: string[],
   nextEntry: PostNullable,
   prevEntry: PostNullable,
   relatedArticles: Post[]
}

export class MyBlog {
   public blogs: Blog;
   public post: object;
   public isAdmin: boolean;
   public allBlogs: Post[];
   private cookie: string | null;

   constructor({ blogs, post, cookie }: { blogs: Post[], post: PostNullable, cookie: string | null }) {
      this.cookie = cookie;
      this.post = post && this.getPost.bind(this, post);
      this.isAdmin = isUserAdmin(this.cookie);
      this.blogs = this.getAllBlogs(blogs, this.isAdmin);
      this.allBlogs = [...this.blogs.latest, ...this.blogs.featured, ...this.blogs.privated];
   }

   public getAllBlogs(blogs: Post[], isAdmin: boolean): Blog {
      let cleanedBlogs: Post[] = blogs;

      if (!isAdmin) {
         cleanedBlogs = blogs.filter((entry: any) => {
            return !entry.data.is_private;
         });
      }

      return this.buildAllBlogs(cleanedBlogs, isAdmin);
   }

   public getPost(post: Post): BasePost {
      const unslugifiedPostTags = [...new Set(post.data.tags.map((tag) => unslugify(tag))
         .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' })))];
      const nextEntry = this.findNextArticle(post, this.allBlogs);
      const prevEntry = this.findPrevArticle(post, this.allBlogs);
      const relatedArticles = findRelatedPostsByTag({
         currentPost: post.data,
         maxRelatedPosts: 3,
         blogPosts: this.allBlogs
      });

      return {
         post,
         unslugifiedPostTags,
         nextEntry,
         prevEntry,
         relatedArticles
      };
   }

   public findNextArticle(post: Post, blogs: Post[]) {
      const nextIndex = blogs.findIndex((entry) => entry.id === post.id);

      if (nextIndex < blogs.length - 1) {
         return blogs[nextIndex + 1];
      }


      return null;
   }

   public findPrevArticle(post: Post, blogs: Post[]) {
      const prevIndex = blogs.findIndex((entry) => entry.id === post.id);

      if (prevIndex > 0) {
         return blogs[prevIndex - 1];
      }

      return null;
   };

   public getPostsFor({ propertyName, property, helper = slugify }: PostFor): Post[] {
      return this.allBlogs.filter((entry: Post) => {
         if (propertyName === 'tags') {
            return entry.data.tags.includes(property as any);
         } else if (propertyName === 'category') {
            return helper(entry.data.category) === property;
         }

         return entry.data.author === property;
      });
   }

   private buildAllBlogs(blogs: Post[], isAdmin: boolean): Blog {
      const _blogs: Blog = {
         latest: [],
         featured: [],
         privated: [],
         categories: [],
         tags: []
      };

      blogs.map((entry: Post) => {
         entry.data.tags = entry.data.tags.sort();

         if (!entry.data.featured_post && !entry.data.is_private) {
            _blogs.latest.push(entry);
         } else if (entry.data.is_private && isAdmin) {
            isAdmin && _blogs.privated.push(entry);
         } else if (entry.data.featured_post) {
            _blogs.featured.push(entry);
         }
      });

      const allTags = blogs.flatMap((entry: any) => entry.data.tags).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
      const allCategories = blogs.flatMap((entry: any) => entry.data.category).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

      _blogs.tags.push(...allTags);
      _blogs.categories.push(...allCategories);

      return _blogs as never;
   }
}
