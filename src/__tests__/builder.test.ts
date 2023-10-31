import type { Post } from 'types/utils';
import { MyBlog } from '../js/builders';
import { test, expect, describe } from 'bun:test';

describe('MyBlog Builder', () => {
   test('should instantiate MyBlog with valid arguments', () => {
      const blogs: Post[] = [];
      const post = null;
      const cookie = 'isAdmin=true';

      const myBlog = new MyBlog({ blogs, post, cookie });

      expect(myBlog).toBeInstanceOf(MyBlog);
      expect(myBlog.blogs).toEqual({
         categories: [],
         featured: [],
         latest: [],
         privated: [],
         tags: []
      });
      expect(myBlog.post).toBeNull();
      expect(myBlog.isAdmin).toBe(true);
      expect(myBlog.allBlogs).toEqual([]);
   });
   test('should return a Blog object with correct properties', () => {
      const blogs = [
         {
            id: '1',
            slug: 'post-1',
            body: {
               title: 'Post 3',
               tags: ['tag3', 'tag4'],
               is_private: false,
               featured_post: true,
               category: 'General',
               excerpt: 'TEST Excerpt',
               date: '22/08/1988',
               author: 'Sergiu Mironescu',
               featured_image: {
                  src: '/test.src',
                  alt: 'test alt'
               }
            },
            collection: 'blogs',
            data: {
               title: 'Post 1',
               tags: ['tag1', 'tag2'],
               is_private: false,
               featured_post: false,
               category: 'General',
               excerpt: 'TEST Excerpt',
               date: '22/08/1988',
               author: 'Sergiu Mironescu',
               featured_image: {
                  src: '/test.src',
                  alt: 'test alt'
               }
            }
         },
         {
            id: '2',
            slug: 'post-2',
            body: {},
            collection: 'blogs',
            data: {
               title: 'Post 2',
               tags: ['tag2', 'tag3'],
               is_private: true,
               featured_post: false,
               category: 'General',
               excerpt: 'TEST Excerpt',
               date: '22/08/1988',
               author: 'Sergiu Mironescu',
               featured_image: {
                  src: '/test.src',
                  alt: 'test alt'
               }
            }
         },
         {
            id: '3',
            slug: 'post-3',
            body: {},
            collection: 'blogs',
            data: {
               title: 'Post 3',
               tags: ['tag3', 'tag4'],
               is_private: false,
               featured_post: true,
               category: 'General',
               excerpt: 'TEST Excerpt',
               date: '22/08/1988',
               author: 'Sergiu Mironescu',
               featured_image: {
                  src: '/test.src',
                  alt: 'test alt'
               }
            }
         }
      ];
      const isAdmin = true;

      const myBlog = new MyBlog({ blogs, post: null, cookie: null });
      const result = myBlog.getAllBlogs(blogs, isAdmin);

      expect(result).toEqual({
         latest: [blogs[0]],
         featured: [blogs[2]],
         privated: [blogs[1]],
         categories: [],
         tags: ['tag1', 'tag2', 'tag2', 'tag3', 'tag3', 'tag4']
      });
   });

   test('should return a BasePost object with correct properties', () => {
      const post = {
         id: '1',
         slug: 'post-1',
         body: {},
         collection: 'posts',
         data: {
            title: 'Post 1',
            tags: ['tag1', 'tag2'],
            is_private: false,
            featured_post: false,
            category: 'General',
            excerpt: 'TEST Excerpt',
            date: '22/08/1988',
            author: 'Sergiu Mironescu',
            featured_image: {
               src: '/test.src',
               alt: 'test alt'
            }
         }
      };
      const allBlogs = [
         post,
         {
            id: '2',
            slug: 'post-2',
            body: {},
            collection: 'blogs',
            data: {
               title: 'Post 2',
               tags: ['tag2', 'tag3'],
               is_private: true,
               featured_post: false,
               category: 'General',
               excerpt: 'TEST Excerpt',
               date: '22/08/1988',
               author: 'Sergiu Mironescu',
               featured_image: {
                  src: '/test.src',
                  alt: 'test alt'
               }
            }
         },
         {
            id: '3',
            slug: 'post-3',
            body: {},
            collection: 'blogs',
            data: {
               title: 'Post 3',
               tags: ['tag3', 'tag4'],
               is_private: false,
               featured_post: true,
               category: 'General',
               excerpt: 'TEST Excerpt',
               date: '22/08/1988',
               author: 'Sergiu Mironescu',
               featured_image: {
                  src: '/test.src',
                  alt: 'test alt'
               }
            }
         }
      ];

      const myBlog = new MyBlog({ blogs: allBlogs, post, cookie: null });
      const postResult = myBlog.getPost(post);

      expect(postResult).toEqual({
         post,
         unslugifiedPostTags: ['tag1', 'tag2'],
         nextEntry: allBlogs[2],
         prevEntry: null,
         relatedArticles: []
      });
   });
});
