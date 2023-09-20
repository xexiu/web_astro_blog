import rss from '@astrojs/rss';

import { formatBlogPosts } from '@js/utils';

const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true });
const posts = formatBlogPosts(Object.values(postImportResult));

export const GET = () => rss({
   stylesheet: '/rss/styles.xsl',
   title: 'Bienvenid@ a mi blog de desarrollo Full Stack - Sergiu Mironescu',
   description: 'Explora mi blog para obtener información y consejos sobre desarrollo Full Stack, JavaScript, HTML, CSS, Node.js, Python, React, React Native, Blockchain, WEB3, dApps, smart contracts y más.',
   site: import.meta.env.SITE,
   items: posts.map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.date,
      description: post.frontmatter.description,
      customData: `<author>${post.frontmatter.author}</author>`
   }))
});