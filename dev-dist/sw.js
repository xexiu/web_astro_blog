if(!self.define){let e,s={};const t=(t,o)=>(t=new URL(t+".js",o).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(o,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let i={};const l=e=>t(e,n),c={module:{uri:n},exports:i,require:l};s[n]=Promise.all(o.map((e=>c[e]||l(e)))).then((e=>(r(...e),i)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/",revision:"0.0n7npd0ukdo"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/"),{allowlist:[/^\/404$/],denylist:[/\/[api,admin,rss,tags,author,category,rss.xml]+\/.*/,/.*?\/.*?rss.*/,/.*?\/.*?rss.*?xml.*/,/\/blog.*/,/code-conduct/]}))}));
