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
        "headline": "${post.title}",
        "description": "${post.description}",
        "image": "${post.featured_image.src}",
        "author": {
          "@type": "Person",
          "name": "${post.author}",
          "url": "${import.meta.env.SITE}/author/${slugify(post.author)}"
        },
        "datePublished": "${post.date}"
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