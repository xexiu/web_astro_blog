import type { Post } from 'types/utils';

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

export class ArticleSpeech extends HTMLElement {
   constructor() {
      super();
      const btn = this.querySelector('.listen-article') as HTMLButtonElement;
      const utterance = new SpeechSynthesisUtterance();

      window.speechSynthesis.onvoiceschanged = function() {
         const voices = window.speechSynthesis.getVoices();
         utterance.voice = voices.filter(function(voice) { return voice.name == 'Flo (Spanish (Spain))"'; })[0];
      };

      utterance.lang = 'es-ES';
      utterance.text = btn.dataset.articleText as string;
      utterance.voice = window.speechSynthesis.getVoices()[0];

      window.speechSynthesis.cancel();

      btn?.addEventListener('click', (event: Event) => {
         event.preventDefault();

         if (btn.classList.contains('pause')) {
            this.pause();
            btn.classList.toggle('pause');
         } else {
            this.play(utterance);
            btn.classList.toggle('pause');
         }
      });

      utterance.addEventListener('end', (event: Event) => {
         event.preventDefault();
         btn.classList.toggle('pause');
      });
   }

   play(text: SpeechSynthesisUtterance) {
      if (this.dataset.paused === 'true') {
         this.dataset.paused = 'false';
         window.speechSynthesis.resume();
      } else {
         window.speechSynthesis.speak(text);
      }
   }

   pause() {
      window.speechSynthesis.pause();
      this.dataset.paused = 'true';
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

export class CopyCode extends HTMLElement {
   constructor() {
      super();

      const element = this.querySelector('.copy-clipboard-code') as HTMLElement;

      if (element) {
         element.addEventListener('click', async () => {
            await navigator.clipboard.writeText(this.dataset.text as string).then(() => {
               element.title = 'Guardado!';
            });
         });
      }
   }
}

export class TabActions extends HTMLElement {
   constructor() {
      super();

      const tabBtns = this.querySelectorAll('[data-tab') as NodeListOf<Element>;
      const tabsContent = this.querySelectorAll('[data-tab-content]');

      tabBtns?.forEach((tabBtn: HTMLButtonElement) => {
         tabBtn?.addEventListener('click', (event: Event) => {
            event.preventDefault();
            if (tabBtn.classList.contains('active')) return;

            const tabId = tabBtn.getAttribute('data-tab');

            tabBtns.forEach((btn) => {
               btn.classList.remove('active');
            });
            tabsContent.forEach((content) => {
               content.classList.remove('active-content');
            });

            tabBtn.classList.add('active');
            const correspondingContent = document.querySelector(
               `[data-tab-content="${tabId}"]`,
            );
            correspondingContent?.classList.add('active-content');
         });
      });
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
               throw new Error('Parsed data is not an array');
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
               .map((d: Post) => ({ slug: d.slug, data: { title: d.data.title } }));

            this.setList(filteredData as Post[]);
         } else {
            this.list.innerHTML = '';
         }
      });
   }

   setList(results: Post[]): void {
      if (results.length === 0) {
         this.noResults();
      }

      for (const post of results) {
         // creating a li element for each result item
         const resultItem = document.createElement('li');
         const resultLink = document.createElement('a');
         resultLink.href = `/blog/${post.slug}`;

         // adding a class to each item of the results
         resultItem.classList.add('result-item');

         // grabbing the name of the current point of the loop and adding the name as the list item's text
         const text = document.createTextNode(post.data.title);
         resultLink.appendChild(text);

         // appending the text to the result item
         resultItem.appendChild(resultLink);

         // appending the result item to the list
         this.list.appendChild(resultItem);
      }
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