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
         Error('No top button provided!')
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
      const icon = this.querySelector('.listen-article') as any;
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = icon.dataset.articleText;
      utterance.voice = window.speechSynthesis.getVoices()[0];

      window.speechSynthesis.cancel();

      icon?.addEventListener('click', (event: Event) => {
         event.preventDefault();

         if (icon.classList.contains('pause')) {
            this.pause();
            icon.classList.toggle('pause');
         } else {
            this.play(utterance);
            icon.classList.toggle('pause');
         }
      });

      utterance.addEventListener('end', (event: Event) => {
         event.preventDefault();
         icon.classList.toggle('pause');
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