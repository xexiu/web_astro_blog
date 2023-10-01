export type Post = {
   id: string;
   body: any;
   slug: string;
   data: {
      category: string;
      title: string;
      description: string;
      tags: string[];
      date: Date | string;
      author: string;
      featured_post: boolean;
      isPrivate: boolean;
      featured_image: object
   }
}