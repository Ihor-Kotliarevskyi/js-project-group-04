import{A as L,a as m}from"./assets/vendor-xD2YBz4L.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function c(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=c(t);fetch(t.href,s)}})();const n={categories:document.querySelector("#categories"),products:document.querySelector("#products"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more-btn"),colorBox:document.querySelector(".products-color-list"),loader:document.querySelector(".loader"),feedbackCardList:document.querySelector(".feedback-card-list"),feedbackNavPrev:document.querySelector(".feedback-nav-prev"),feedbackNavNext:document.querySelector(".feedback-nav-next")};function v(r){const c=[{_id:"all",name:"Всі товари"},...r].map(({_id:o,name:t})=>`<li
        class="category-item" id="${o}"
        style="
          background-image: image-set(
            url('./furniture-bg/${o}.png') 1x,
            url('./furniture-bg/${o}@2x.png') 2x
          );
        "
      ><button class="categories-btn" type="button">${t}</button></li>`).join("");n.categories.innerHTML=c}function d(r){const e=r.map(({_id:c,name:o,images:t,price:s,color:l})=>`<li class="product-item">
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
      </li>`).join("");n.products.insertAdjacentHTML("beforeend",e)}function S(){n.products.innerHTML=""}new L(".accordion-container",{duration:300,showMultiple:!1});const $="https://furniture-store-v2.b.goit.study/api",g={FURNITURES:"/furnitures",CATEGORIES:"/categories"},f=8;m.defaults.baseURL=$;async function p(r=1){const{data:e}=await m(`${g.FURNITURES}?page=${r}&limit=${f}`);return e}async function b(r,e){const{data:c}=await m(`${g.FURNITURES}?page=${e}&limit=${f}&category=${r}`);return c}async function I(){return(await m.get(g.CATEGORIES)).data}function y(){setTimeout(()=>{n.loadMoreBtn.classList.add("is-show")},500)}function u(){n.loadMoreBtn.classList.remove("is-show")}let a=1,i="";async function w(){try{const r=await I();v(r),i="all",n.categories.children[0].classList.add("categories-item--active");const{furnitures:c}=await p();d(c),y()}catch{}finally{}}async function C(r){const e=r.target.closest(".category-item");if(!e)return;[...r.currentTarget.children].map(o=>{o.classList.remove("categories-item--active")}),S(),e.classList.add("categories-item--active"),a=1,i=e.id;try{if(i==="all"){const{furnitures:o}=await p();d(o),y()}else{const{furnitures:o,totalItems:t}=await b(i,a);if(o.length)t<f&&u(),d(o);else{u();return}}}catch{}finally{}}async function E(r){r.preventDefault(),a++;try{if(i==="all"){const{furnitures:e,totalItems:c}=await p(a);c<f*a?u():y(),d(e)}else{const{furnitures:e,totalItems:c}=await b(i,a);if(e.length)c<f&&u(),d(e);else{u();return}}}catch{}finally{}}document.addEventListener("DOMContentLoaded",w);n.categories.addEventListener("click",C);n.loadMoreBtn.addEventListener("click",E);
//# sourceMappingURL=index.js.map
