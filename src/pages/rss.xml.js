import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
   const blog = await getCollection('blog');

   return rss({
      stylesheet: '/rss/styles.xsl',
      title: 'Bienvenid@ a mi blog de desarrollo Full Stack - Sergiu Mironescu',
      // eslint-disable-next-line max-len
      description: 'Explora mi blog para obtener información y consejos sobre desarrollo Full Stack, JavaScript, HTML, CSS, Node.js, Python, React, React Native, Blockchain, WEB3, dApps, smart contracts y más.',
      site: context.site, // import.meta.env.SITE
      items: blog.map((post) => ({
         link: `/blog/${post.slug}/`,
         title: post.data.title,
         pubDate: post.data.date,
         description: post.data.description,
         customData: `<author>${post.data.author}</author>`
      }))
   });
}