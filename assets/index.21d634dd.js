import{d as e,r as t,o,c as r,a as n,t as s,F as l,p as a,b as i,e as u,u as d,f as c,g as p}from"./vendor.bdd0efff.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var f=(e,t)=>{for(const[o,r]of t)e[o]=r;return e};const m=e=>(a("data-v-7bad3d28"),e=e(),i(),e),g=m((()=>n("p",null,[u(" Recommended IDE setup: "),n("a",{href:"https://code.visualstudio.com/",target:"_blank"},"VSCode"),u(" + "),n("a",{href:"https://github.com/johnsoncodehk/volar",target:"_blank"},"Volar")],-1))),h=m((()=>n("p",null,[u("See "),n("code",null,"README.md"),u(" for more information.")],-1))),v=m((()=>n("p",null,[n("a",{href:"https://vitejs.dev/guide/features.html",target:"_blank"}," Vite Docs "),u(" | "),n("a",{href:"https://v3.vuejs.org/",target:"_blank"},"Vue 3 Docs")],-1))),b=m((()=>n("p",null,[u(" Edit "),n("code",null,"components/HelloWorld.vue"),u(" to test hot module replacement. ")],-1)));var y=f(e({props:{msg:{type:String,required:!0}},setup(e){const a=t(0);return(t,i)=>(o(),r(l,null,[n("h1",null,s(e.msg),1),g,h,v,n("button",{type:"button",onClick:i[0]||(i[0]=e=>a.value++)},"count is: "+s(a.value),1),b],64))}}),[["__scopeId","data-v-7bad3d28"]]);const k=n("img",{alt:"Vue logo",src:"/CheckingBoard/assets/logo.03d6d6da.png"},null,-1);p(e({setup:e=>(e,t)=>(o(),r(l,null,[k,n("div",null,s(d("/CheckingBoard/")),1),c(y,{msg:"Hello Vue 3 + TypeScript + Vite"})],64))})).mount("#app");