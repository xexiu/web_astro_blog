import rss from '@astrojs/rss';
import { getCollectionFor } from '@js/server/utils';
import { isUserAdmin } from '@js/utils';
import { getCollection } from 'astro:content';


export async function GET(context) {
   const isAdmin = isUserAdmin(context.cookies);
   const blogs = await getCollectionFor('blog', isAdmin, getCollection);

   return rss({
      stylesheet: '/rss/styles.xsl',
      title: 'Bienvenid@ a mi blog de desarrollo Full Stack - Sergiu Mironescu',
      // eslint-disable-next-line max-len
      description: 'Explora mi blog para obtener información y consejos sobre desarrollo Full Stack, JavaScript, HTML, CSS, Node.js, Python, React, React Native, Blockchain, WEB3, dApps, smart contracts y más.',
      site: context.site, // import.meta.env.SITE
      items: [...blogs.latest, ...blogs.pinned, ...blogs.private].map((post) => ({
         link: `/blog/${post.slug}/`,
         title: post.data.title,
         pubDate: post.data.date,
         description: post.data.description,
         customData: `<author>${post.data.author}</author>`
      }))
   });
}
