import{d as e,r as t,p as a,a as o,c as r,b as n,t as s,F as l,e as d,f as i,o as c,g as u,h as p,i as m}from"./vendor.8e84ce69.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var f=e({name:"HelloWorld",props:{msg:{type:String,required:!0}},setup:()=>({count:t(0)})});a("data-v-9ba5e0a8");const g=d('<p data-v-9ba5e0a8> Recommended IDE setup: <a href="https://code.visualstudio.com/" target="_blank" data-v-9ba5e0a8>VSCode</a> + <a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank" data-v-9ba5e0a8> Vetur </a> or <a href="https://github.com/johnsoncodehk/volar" target="_blank" data-v-9ba5e0a8>Volar</a> (if using <code data-v-9ba5e0a8>&lt;script setup&gt;</code>) </p><p data-v-9ba5e0a8>See <code data-v-9ba5e0a8>README.md</code> for more information.</p><p data-v-9ba5e0a8><a href="https://vitejs.dev/guide/features.html" target="_blank" data-v-9ba5e0a8> Vite Docs </a> | <a href="https://v3.vuejs.org/" target="_blank" data-v-9ba5e0a8>Vue 3 Docs</a></p>',3),v=n("p",null,[i(" Edit "),n("code",null,"components/HelloWorld.vue"),i(" to test hot module replacement. ")],-1);o(),f.render=function(e,t,a,o,d,i){return c(),r(l,null,[n("h1",null,s(e.msg),1),g,n("button",{type:"button",onClick:t[0]||(t[0]=t=>e.count++)},"count is: "+s(e.count),1),v],64)},f.__scopeId="data-v-9ba5e0a8";var b=e({name:"App",components:{HelloWorld:f}});const h=n("img",{alt:"Vue logo",src:"/assets/logo.03d6d6da.png"},null,-1);b.render=function(e,t,a,o,n,s){const d=u("HelloWorld");return c(),r(l,null,[h,p(d,{msg:"Hello Vue 3 + TypeScript + Vite"})],64)},m(b).mount("#app");
