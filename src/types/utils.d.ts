export type Post = {
    frontmatter: {
       draft: boolean,
       date: string,
       category: string,
       title: string
    },
    url: string
 }