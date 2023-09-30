export type Post = {
   slug: string;
   data: {
      category: string;
      title: string;
      description: string;
      tags: string[];
      date: Date;
      author: string;
      featured_post: boolean;
      featured_image: object
   }
}