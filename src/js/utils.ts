import type { Post, PostData } from 'types/utils';

export function updateTheme(value: string):void {
   document.documentElement.classList.remove('light', 'dark');
   document.documentElement.classList.add(value);
   localStorage.setItem('theme', value);
}

export function slugify(text: string):string {
   return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
}

export function formatDate(date: string):string {
   return new Date(date).toLocaleDateString('es-ES', {
      timeZone: 'GMT',
   });
}

export function isVisible(elem: HTMLElement):boolean {
   return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

export function litenerHelper(element: HTMLElement, eventName: string, cb: Function):void {

   const eventListener = (event: Event) => {
      cb(event, element);
      removeEventListener();
   };

   const removeEventListener = () => {
      element.removeEventListener(eventName, eventListener);
   };

   element.addEventListener(eventName, eventListener);
}

export function hideOnClickOutside(element: HTMLElement, cb: Function):void {
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

export function markAsCurrentPage(elements: NodeListOf<Element>) {
   elements.forEach((link: HTMLLinkElement) => {
      if (link.getAttribute('href') === window.location.pathname) {
         link.setAttribute('aria-current', 'page');
      }
   });
}

export function readingTime(text: string) {
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

export function isInViewport(el: HTMLElement): boolean {
   const rect = el.getBoundingClientRect();

   return (
      rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
   );
}

export function isInViewPortScrolling(el: HTMLElement): any {
   function scrollObserver() {
      document.removeEventListener('scroll', scrollObserver);

      return isInViewport(el);
   }

   document.addEventListener('scroll', scrollObserver, { passive: true });

}

export function findRelatedPostsByTag(currentPost: PostData, maxRelatedPosts = 3, blogPosts: Post[]) {
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
      if (commonTags.length >= 1) {
         relatedPosts.push(post as never);
      }

      // Break when we reach the maximum number of related posts
      if (relatedPosts.length >= maxRelatedPosts) break;
   }

   return relatedPosts;
}