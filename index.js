import{A as L,a as m}from"./assets/vendor-xD2YBz4L.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function c(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=c(t);fetch(t.href,s)}})();const a={categories:document.querySelector("#categories"),products:document.querySelector("#products"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more-btn"),colorBox:document.querySelector(".products-color-list"),loader:document.querySelector(".loader"),feedbackCardList:document.querySelector(".feedback-card-list"),feedbackNavPrev:document.querySelector(".feedback-nav-prev"),feedbackNavNext:document.querySelector(".feedback-nav-next")};function v(r){const c=[{_id:"all",name:"Всі товари"},...r].map(({_id:o,name:t})=>`<li
        class="category-item" id="${o}"
        style="
          background-image: image-set(
            url('./furniture-bg/${o}.png') 1x,
            url('./furniture-bg/${o}@2x.png') 2x
          );
        "
      ><button class="categories-btn" type="button">${t}</button></li>`).join("");a.categories.innerHTML=c}function d(r){const e=r.map(({_id:c,name:o,images:t,price:s,color:l})=>`<li class="product-item" data-id="${c}">
        <img
          class="products-image"
          src='${t[0]}'
          alt="${o}"
        />
        <div class="product-description-box">
          <h4 class="products-title">${o}</h4>
          <ul class="products-color-list">
            ${l.map(h=>`<li class="products-color-box" style="background-color: ${h}"></li>`).join("")}
          </ul>
          <p class="products-price">${s} грн</p>
        </div>
        <button class="products-details-btn" type="button">Детальніше</button>
      </li>`).join("");a.products.insertAdjacentHTML("beforeend",e)}function w(){a.products.innerHTML=""}new L(".accordion-container",{duration:300,showMultiple:!1});const S="https://furniture-store-v2.b.goit.study/api",g={FURNITURES:"/furnitures",CATEGORIES:"/categories"},f=8;m.defaults.baseURL=S;async function p(r=1){const{data:e}=await m(`${g.FURNITURES}?page=${r}&limit=${f}`);return e}async function b(r,e){const{data:c}=await m(`${g.FURNITURES}?page=${e}&limit=${f}&category=${r}`);return c}async function $(){return(await m.get(g.CATEGORIES)).data}function y(){setTimeout(()=>{a.loadMoreBtn.classList.add("is-show")},500)}function u(){a.loadMoreBtn.classList.remove("is-show")}let n=1,i="";async function I(){try{const r=await $();v(r),i="all",a.categories.children[0].classList.add("categories-item--active");const{furnitures:c}=await p();d(c),y()}catch{}finally{}}async function C(r){const e=r.target.closest(".category-item");if(!e)return;[...r.currentTarget.children].map(o=>{o.classList.remove("categories-item--active")}),w(),e.classList.add("categories-item--active"),n=1,i=e.id;try{if(i==="all"){const{furnitures:o}=await p();d(o),y()}else{const{furnitures:o,totalItems:t}=await b(i,n);if(o.length)t<f&&u(),d(o);else{u();return}}}catch{}finally{}}async function E(r){r.preventDefault(),n++;try{if(i==="all"){const{furnitures:e,totalItems:c}=await p(n);c<f*n?u():y(),d(e)}else{const{furnitures:e,totalItems:c}=await b(i,n);if(e.length)c<f&&u(),d(e);else{u();return}}}catch{}finally{}}window.addEventListener("load",()=>{requestAnimationFrame(()=>{window.scrollTo({top:0,left:0,behavior:"auto"})})});document.addEventListener("DOMContentLoaded",I);a.categories.addEventListener("click",C);a.loadMoreBtn.addEventListener("click",E);
//# sourceMappingURL=index.js.map
