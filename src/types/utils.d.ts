export type PostDataFeaturedImage = {
   src: string | any;
   width?: number;
   height?: number;
   format?: string;
   orientation?: string;
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
   twitter_name?: string;
}

export type PortFolioData = {
   category: string;
   title: string;
   excerpt: string;
   tags: string[];
   date: Date | string;
   author: string;
   github_project_link?: string;
   featured_portfolio?: boolean;
   demo_link?: string;
   video_link?: string;
   featured_image: PostDataFeaturedImage;
   twitter_name?: string;
}

export type Nullable<T> = T | null;

export type Post = {
   id: string;
   slug: string;
   body: any;
   collection: string;
   data: PostData
}

export type PostNullable = Nullable<Post>

export type PortFolio = {
   id: string;
   slug: string;
   body: any;
   collection: string;
   data: PortFolioData
}

export type Blog = {
   latest: Post[];
   featured: Post[];
   privated: Post[];
   categories: string[];
   tags: string[]
}

export type RelatedArticles = {
   currentPost: PostData,
   maxRelatedPosts: number,
   minCommonTags?: number,
   blogPosts: Post[]
}

export type PostFor = {
   propertyName: string,
   property: string,
   helper?: Function
}

export type Cookies = {
   // eslint-disable-next-line no-unused-vars
   get: (param: string) => string | undefined;
}

export type Links = {
   iconName?: string;
   name?: string;
   path: string
}
