import type { Post } from 'types/utils';
import { litenerHelper } from './utils';

export class SaveArticle extends HTMLElement {
   topBtn: HTMLElement | null;
   storagePosts: string | null;
   posts: object;

   constructor(topBtnSelector: string) {
      super();
      const defaultTopBtn: HTMLElement | null = document.querySelector(topBtnSelector || '.top-link-saved-items');
      this.topBtn = this.querySelector('.top-link-saved-items') || defaultTopBtn;
      this.storagePosts = localStorage.getItem('posts');
      this.posts = this.storagePosts !== null && this.storagePosts !== '{}' ? JSON.parse(this.storagePosts) : {};
      this.markTopBtn();
   }

   hasItems() {
      return !!Object.keys(this.posts).length;
   }

   clearItems() {
      localStorage.clear();
      this.posts = {};
   }

   markTopBtn() {
      if (this.topBtn) {
         this.topBtn.dataset.hasItems = !!Object.keys(this.posts).length ? 'true' : 'false';
         this.topBtn.dataset.savedItems = String(Object.keys(this.posts).length);
      } else {
         Error('No top button provided!');
      }
   }
}

export class SaveArticleDetails extends SaveArticle {
   constructor() {
      super('.top-link-saved-items');
      const saveBtn = this.querySelector('.save-article') as any;
      const post: string = saveBtn?.dataset.post;
      const postId: string = saveBtn?.dataset.postId;

      if (!!Object.keys(this.posts).length && this.posts[postId]) {
         saveBtn.title = 'Deshacer guardado';
         saveBtn.classList.add('saved');
      }

      function performActions(event: Event) {
         event.preventDefault();

         if (!!Object.keys(this.posts).length) {
            if (this.posts[postId]) {
               this.removeItem(saveBtn, this.posts, postId);
               this.markTopBtn(this.topBtn, this.posts);
            } else {
               this.addItem(this.posts, postId, post, saveBtn);
               this.markTopBtn(this.topBtn, this.posts);
            }
         } else {
            this.addItem(this.posts, postId, post, saveBtn);
            this.markTopBtn(this.topBtn, this.posts);
         }
      }

      saveBtn?.addEventListener('click', performActions.bind(this));

   }

   removeItem(saveBtn: HTMLElement, posts: object, postId: string) {
      saveBtn.title = 'Guardar artículo';
      saveBtn.classList.remove('saved');
      delete posts[postId];
      localStorage.setItem('posts', JSON.stringify(posts));
   }
   addItem(posts: object, postId: string, post: object, saveBtn: HTMLElement) {
      Object.assign(posts, { [postId]: post });
      saveBtn.title = 'Deshacer guardado';
      saveBtn.classList.add('saved');
      localStorage.setItem('posts', JSON.stringify(posts));
   }
}

export class CopyrightFooter extends HTMLElement {
   constructor() {
      super();

      const element = this.querySelector('#copyright') as HTMLElement;

      if (element) {
         const copyright = element?.innerText;

         element.textContent = copyright;
      }
   }
}

export class BaseCopyCode extends HTMLElement {
   private text: string | undefined;

   constructor() {
      super();
      this.text = this.dataset.text;
      const element = this.querySelector('.copy-clipboard-code') as HTMLElement;
      const feedbackDiv = this.querySelector('.feedback') as HTMLElement;
      const icon = this.querySelector('.feedback-icon') as HTMLElement;

      if (element) {
         this.copyCoadToClipboard(element, feedbackDiv, icon);
      }
   }
   copyCoadToClipboard(element: HTMLElement, feedbackDiv: HTMLElement, icon: HTMLElement) {
      litenerHelper(element, 'click', async (event: Event) => {
         event.preventDefault();
         await navigator.clipboard.writeText(this.text as string).then(() => {
            element.title = 'Copiado!';

            if (icon) {
               icon.remove();
               const spanEl = document.createElement('span');
               spanEl.classList.add('feedback-text');
               spanEl.innerHTML = '&#10004;';
               element.appendChild(spanEl);
            }

            if (feedbackDiv) {
               feedbackDiv.classList.remove('btn-blue');
               feedbackDiv.classList.add('btn-grey');
               feedbackDiv.innerText = 'Copiado';
            }
         });
      });
   }
}

export class CopyCode extends BaseCopyCode {
   constructor() {
      super();
   }
}

export class SocialShareCopyCode extends BaseCopyCode {

   constructor() {
      super();
   }
}

export class SearchBarHelper extends HTMLElement {
   list: HTMLUListElement;

   constructor() {
      super();
      this.list = this.querySelector('#list') as HTMLUListElement;
      const searchInput = document.querySelector('.input-search');

      const rawData: string | undefined = this.dataset.text;

      let data: Post[] = [];

      if (rawData) {
         try {
            data = JSON.parse(rawData);

            if (!Array.isArray(data)) {
               throw new Error('Parsed data is not an array: SearchBarHelper');
            }
         } catch (error) {
            throw new Error('Error parsing data: SearchBarHelper', error);
         }
      }

      searchInput?.addEventListener('input', (e: InputEvent) => {
         this.list.innerHTML = '';
         const { value } = e.target as HTMLInputElement;

         if (value && value.trim().length > 0) {
            const searchTerm = value.trim().toLowerCase();

            const filteredData = data && data
               .filter((d: Post) => d.data.title.toLowerCase().includes(searchTerm))
               .map((d: Post) => ({ slug: d.slug, data: { title: d.data.title, excerpt: d.data.excerpt } }));

            this.setList(filteredData as Post[], searchTerm);
         } else {
            this.list.innerHTML = '';
         }
      });
   }

   setList(results: Post[], searchTerm: string): void {
      if (results.length === 0) {
         this.noResults();
      }

      for (const post of results) {
         this.highlight(searchTerm, post);

         // creating a li element for each result item
         const resultItem = document.createElement('li');
         const resultLink = document.createElement('a');
         const excerptNode = document.createElement('div');
         resultLink.href = `/blog/${post.slug}`;

         // adding a class to each item of the results
         resultItem.classList.add('result-item');

         resultLink.innerHTML = post.data.title;
         excerptNode.innerHTML = post.data.excerpt;
         // appending the text to the result item
         resultItem.appendChild(resultLink);
         resultItem.appendChild(excerptNode);

         // appending the result item to the list
         this.list.appendChild(resultItem);
      }
   }

   highlight(text: string, post: Post) {
      const lowerText = text.toLowerCase();
      const { title } = post.data;
      const highlightedTitle = title
         .split(new RegExp(`(${lowerText})`, 'i'))
         .map((part) =>
            part.toLowerCase() === lowerText
               ? `<span class='highlight'>${part}</span>`
               : part
         )
         .join('');

      post.data.title = highlightedTitle;
   }

   noResults() {
      // create an element for the error; a list item ("li")
      const error = document.createElement('li');
      // adding a class name of "error-message" to our error element
      error.classList.add('error-message');

      // creating text for our element
      const text = document.createTextNode('Resultados no encontrados!');
      // appending the text to our element
      error.appendChild(text);
      // appending the error to our list element
      this.list.appendChild(error);
   }
}
