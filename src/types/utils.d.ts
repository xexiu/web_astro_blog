export type PostDataFeaturedImage = {
   src: string | any;
   alt: string;
}

export type PostData = {
   category: string;
   title: string;
   excerpt: string;
   tags: string[];
   date: Date | string;
   author: string;
   featured_post?: boolean;
   is_private?: boolean;
   featured_image: PostDataFeaturedImage;
}

export type PortFolioData = {
   category: string;
   title: string;
   excerpt: string;
   tags: string[];
   date: Date | string;
   author: string;
   github_project_link: string;
   featured_portfolio?: boolean;
   demo_link?: string;
   video_link?: string;
   featured_image: PostDataFeaturedImage;
}

export type Post = {
   id: string;
   slug: string;
   body: any;
   collection: string;
   data: PostData
}

export type PortFolio = {
   id: string;
   slug: string;
   body: any;
   collection: string;
   data: PortFolioData
}

export type Blog = {
   latest: Post[];
   pinned: Post[];
   private: Post[];
}

export type RelatedArticles = {
   currentPost: PostData,
   maxRelatedPosts: number,
   minCommonTags?: number,
   blogPosts: Post[]
}

export type PostFor = {
   propertyName: string,
   blog: Blog,
   property: string,
   helper?: Function
}

export type Cookies = {
   // eslint-disable-next-line no-unused-vars
   get: (param: string) => string | undefined;
}
