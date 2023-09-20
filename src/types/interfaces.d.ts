export interface LinkProps {
   text?: string;
   href: string;
   style: 'primary' | 'secondary';
   icon?: {
      name: string;
      side: 'left' | 'right';
      width?: string | '24';
      height?: string | '24';
      class?: string
   };
   isFilled?: boolean;
   borderVisible?: boolean;
   classes?: string;
   target: string;
}