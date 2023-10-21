import { slugify } from '@js//utils';
import siteData from '@schemas/site-data.json';


export default function jsonLDGenerator({ type, post, url }) {
   if (type === 'post') {
      return `<script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${url}"
        },
        "headline": "${post.data.title}",
        "description": "${post.data.excerpt}",
        "image": "${post.data.featured_image.src.src}",
        "author": {
          "@type": "Person",
          "name": "${post.data.author}",
          "url": "${import.meta.env.SITE}/author/${slugify(post.data.author)}"
        },
        "datePublished": "${post.data.date}"
      }
    </script>`;
   }

   return `<script type="application/ld+json">
      {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "${siteData.title}",
      "url": "${import.meta.env.SITE}"
      }
    </script>`;
}
