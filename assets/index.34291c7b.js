import{o as e,c as t,a as o,d as r,r as n,b as s,t as l,F as a,p as i,e as c,f as u,u as d,g as p}from"./vendor.3a55d19d.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const m={width:"1.2em",height:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},f=[o("g",{fill:"none"},[o("path",{d:"M11 3.672h2V16.5l3.243-3.243l1.414 1.415L12 20.328l-5.657-5.656l1.414-1.415L11 16.5V3.672z",fill:"currentColor"})],-1)];var g={name:"gg-arrow-down",render:function(o,r){return e(),t("svg",m,f)}},h=(e,t)=>{for(const[o,r]of t)e[o]=r;return e};const v=e=>(i("data-v-6c163968"),e=e(),c(),e),y=v((()=>o("p",null,[u(" Recommended IDE setup: "),o("a",{href:"https://code.visualstudio.com/",target:"_blank"},"VSCode"),u(" + "),o("a",{href:"https://github.com/johnsoncodehk/volar",target:"_blank"},"Volar")],-1))),b=v((()=>o("p",null,[u("See "),o("code",null,"README.md"),u(" for more information.")],-1))),k=v((()=>o("p",null,[o("a",{href:"https://vitejs.dev/guide/features.html",target:"_blank"}," Vite Docs "),u(" | "),o("a",{href:"https://v3.vuejs.org/",target:"_blank"},"Vue 3 Docs")],-1))),V=v((()=>o("p",null,[u(" Edit "),o("code",null,"components/HelloWorld.vue"),u(" to test hot module replacement. ")],-1)));var w=h(r({props:{msg:{type:String,required:!0}},setup(r){const i=n(0);return(n,c)=>{const u=g;return e(),t(a,null,[s(u,{class:"h-15 w-15"}),o("h1",null,l(r.msg),1),y,b,k,o("button",{type:"button",onClick:c[0]||(c[0]=e=>i.value++)},"count is: "+l(i.value),1),V],64)}}}),[["__scopeId","data-v-6c163968"]]);const L=o("img",{alt:"Vue logo",src:"/CheckingBoard/assets/logo.03d6d6da.png"},null,-1);p(r({setup:r=>(r,n)=>{const i=w;return e(),t(a,null,[L,o("div",null,l(d("/CheckingBoard/")),1),s(i,{msg:"Hello Vue 3 + TypeScript + Vite"})],64)}})).mount("#app");
