import type { Post } from 'types/utils';

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
   return new Date(date).toLocaleDateString('en-US', {
      timeZone: 'UTC',
   });
}

export function formatBlogPosts(posts: Post[], {
   filterOutDrafts = true,
   filterOutFuturePosts = true,
   sortByDate = true,
   limit = undefined,
} = {}): Post[] {

   const filteredPosts = posts.reduce((acc: Post[], post: Post) => {
      const { date, draft } = post.frontmatter;
      // filterOutDrafts if true
      if (filterOutDrafts && draft) return acc;

      // filterOutFuturePosts if true
      if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

      // add post to acc
      acc.push(post);

      return acc;
   }, []);

   // sortByDate or randomize
   if (sortByDate) {
      filteredPosts.sort((a: any, b: any) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
   } else {
      filteredPosts.sort(() => Math.random() - 0.5);
   }

   // limit if number is passed
   if (typeof limit === 'number') {
      return filteredPosts.slice(0, limit);
   }

   return filteredPosts;

}

export function isVisible(elem: HTMLElement):boolean {
   return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
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