import type { Post, Blog, RelatedArticles, PostFor } from 'types/utils';

export function updateTheme(value: string): void {
   document.documentElement.classList.remove('light', 'dark');
   document.documentElement.classList.add(value);
   localStorage.setItem('theme', value);
}

export function slugify(text: string): string {
   return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
}

export function formatDate(date: string): string {
   return new Date(date).toLocaleDateString('es-ES', {
      timeZone: 'GMT',
   });
}

export function isVisible(elem: HTMLElement): boolean {
   return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

export function litenerHelper(element: HTMLElement, eventName: string, cb: Function): void {

   const eventListener = (event: Event) => {
      cb(event, element);
      removeEventListener();
   };

   const removeEventListener = () => {
      element.removeEventListener(eventName, eventListener);
   };

   element.addEventListener(eventName, eventListener);
}

export function hideOnClickOutside(element: HTMLElement, cb: Function): void {
   const outsideClickListener = (event: Event) => {
      const targetElement = event.target as HTMLElement;

      if (!element.contains(targetElement) && isVisible(element)) {
         cb(event, element);
         removeClickListener();
      }
   };

   const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
   };

   document.addEventListener('click', outsideClickListener);
}

export function markAsCurrentPage(elements: NodeListOf<Element>): void {
   elements.forEach((link: HTMLLinkElement) => {
      if (link.getAttribute('href') === window.location.pathname) {
         link.setAttribute('aria-current', 'page');
      }
   });
}

export function readingTime(text: string): object {
   // Split the text into an array of words
   const wordsArray = text.split(' ');

   // Count the number of words in the array
   const wordCount = wordsArray.length;

   // Calculate the estimated reading time
   const wordsPerMinute = 200;
   const readingTime = Math.ceil(wordCount / wordsPerMinute);

   return {
      wordCount,
      time: readingTime
   };
}

export function isInViewport(el: HTMLElement, partiallyVisible = false): boolean {
   const { top, left, bottom, right } = el.getBoundingClientRect();
   const { innerHeight, innerWidth } = window;

   return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
         (bottom > 0 && bottom < innerHeight)) &&
      ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

export function isInViewPortScrolling(el: HTMLElement): void {
   function scrollObserver() {
      document.removeEventListener('scroll', scrollObserver);

      return isInViewport(el);
   }

   document.addEventListener('scroll', scrollObserver, { passive: true });

}

export function findRelatedPostsByTag({ currentPost, maxRelatedPosts, minCommonTags = 2, blogPosts }: RelatedArticles): Post[] {
   const relatedPosts = [];

   // Iterate through all blog posts
   for (const post of blogPosts) {
      // Skip the current post itself
      if (post.data.title === currentPost.title) continue;

      // Calculate the number of common tags between the current post and the target post
      const commonTags = currentPost.tags.filter((tag) =>
         post.data.tags.includes(tag)
      );

      // You can adjust the threshold for similarity as per your requirements
      if (commonTags.length >= minCommonTags) {
         relatedPosts.push(post as never);
      }

      // Break when we reach the maximum number of related posts
      if (relatedPosts.length >= maxRelatedPosts) break;
   }

   return relatedPosts;
}

export function setCookie(name: string, value: string, days: number): void {
   var expires = '';

   if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
   }

   document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function getCookie(name: string): string {
   var nameEQ = name + '=';
   var ca = document.cookie.split(';');

   for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
   }

   return '';
}

export function eraseCookie(name: string): void {
   document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function getTagsFor(isAdmin: boolean, collection: Blog): [] {
   return [...collection.latest, ...collection.pinned, ...collection.private]
      .filter((entry: any) => isAdmin ? entry : !entry.data.is_private)
      .flatMap((entry: any) => entry.data.tags) as [];
}

export function getPostsFor({ propertyName, blog, property, helper = slugify }: PostFor): Post[] {
   return [...blog.latest, ...blog.pinned, ...blog.private].filter((entry: Post) => {
      if (propertyName === 'tags') {
         return entry.data.tags.includes(property as any);
      } else if(propertyName === 'category') {
         return helper(entry.data.category) === property;
      }

      return entry.data.author === property;
   });
}

export function getAllPostsFor(blog: Blog) {
   const posts = [...blog.latest, ...blog.pinned, ...blog.private];

   return posts.map((entry: Post, index: number) => ({
      params: { slug: entry.slug },
      props: {
         entry,
         indexEntry: index,
         nextEntry: posts[index + 1],
         prevEntry: posts[index - 1],
         relatedArticles: findRelatedPostsByTag({ currentPost: entry.data, maxRelatedPosts: 3, blogPosts: posts }),
      }
   }));
}

export function getTagCounts(tags: []): object {
   const tagCounts = {};

   tags.forEach((tag: string) => {
      if (tagCounts[tag]) {
         tagCounts[tag]++;
      } else {
         tagCounts[tag] = 1 as never;
      }
   });

   return tagCounts;
}

export function getRelatedArticles(isAdmin: boolean, relatedArticles: Post[]): Post[] {
   return relatedArticles.filter((entry: Post) =>
      isAdmin ? entry : !entry.data.is_private,
   );
}

export function isPlainString(input: string): boolean {
   const pattern = /^[a-zA-Z0-9\s]*$/;

   return pattern.test(input);
}

export function formatString(template: string, options: object): string {
   const regex = /\{(__\w+__)}/g;
   const matches = template.match(regex);

   if (matches) {
      matches.forEach((match) => {
         const placeholder = match.slice(1, -1);


         for (const key in options) {
            if (placeholder === key) {
               // eslint-disable-next-line no-param-reassign
               template = template.replace(match, options[key]);
               break;
            }
         }
      });
   }

   return template;
}