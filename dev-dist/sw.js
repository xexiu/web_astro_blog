if(!self.define){let e,s={};const t=(t,o)=>(t=new URL(t+".js",o).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(o,r)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let n={};const l=e=>t(e,i),c={module:{uri:i},exports:n,require:l};s[i]=Promise.all(o.map((e=>c[e]||l(e)))).then((e=>(r(...e),n)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/",revision:"0.obuk0iadjmo"}],{directoryIndex:"index.html"}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/"),{allowlist:[/^\/404$/],denylist:[/\/[api,admin,rss,tags,author,category,rss.xml]+\/.*/,/.*?\/.*?rss.*/,/.*?\/.*?rss.*?xml.*/,/\/blog.*/,/code-conduct/]}))}));
