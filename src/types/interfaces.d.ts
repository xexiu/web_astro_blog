export interface LinkProps {
   text?: string;
   href: string;
   customStyle: any;
   icon?: {
      name: string;
      side: 'left' | 'right';
      width?: string | '24';
      height?: string | '24';
      class?: string;
   };
   isFilled?: boolean;
   borderVisible?: boolean;
   classes?: string;
   target: string;
   isExternalLink?: boolean;
}

export interface HeadProps {
   title: string;
   description: string;
   featured_image: any;
   frontmatter: any;
   robots: any;
}
