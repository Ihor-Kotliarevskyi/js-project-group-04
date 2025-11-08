import{A as h,a as g}from"./assets/vendor-xD2YBz4L.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const c of t)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const c={};return t.integrity&&(c.integrity=t.integrity),t.referrerPolicy&&(c.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?c.credentials="include":t.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(t){if(t.ep)return;t.ep=!0;const c=s(t);fetch(t.href,c)}})();const a={categories:document.querySelector("#categories"),products:document.querySelector("#products"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more-btn"),loader:document.querySelector(".loader"),feedbackCardList:document.querySelector(".feedback-card-list"),feedbackNavPrev:document.querySelector(".feedback-nav-prev"),feedbackNavNext:document.querySelector(".feedback-nav-next")};function L(r){const s=[{_id:"all",name:"Всі товари"},...r].map(({_id:o,name:t})=>`<li
        class="category-item" id="${o}"
        style="
          background-image: image-set(
            url('./furniture-bg/${o}.png') 1x,
            url('./furniture-bg/${o}@2x.png') 2x
          );
        "
      ><button class="categories-btn" type="button">${t}</button></li>`).join("");a.categories.innerHTML=s}function d(r){const e=r.map(({_id:s,name:o,images:t,price:c,color:i})=>`<li class="product-item">
        <img
          class="products-image"
          src='${t[0]}'
          alt="${o}"
        />
        <div class="product-description-box">
          <h4 class="products-title">${o}</h4>
          <ul class="products-color-list">
            <li class="products-color-box" style="background-color: ${i[0]}"></li>
            <li class="products-color-box" style="background-color: ${i[1]}"></li>
            <li
              class="products-color-box"
              style="background-color: ${i[2]}"
            ></li>
          </ul>
          <p class="products-price">${c} грн</p>
        </div>
        <button class="products-details-btn" type="button">Детальніше</button>
      </li>`).join("");a.products.insertAdjacentHTML("beforeend",e)}function v(){a.products.innerHTML=""}new h(".accordion-container",{duration:300,showMultiple:!1});const $="https://furniture-store-v2.b.goit.study/api",m={FURNITURES:"/furnitures",CATEGORIES:"/categories"},f=8;g.defaults.baseURL=$;async function p(r=1){const{data:e}=await g(`${m.FURNITURES}?page=${r}&limit=${f}`);return e}async function b(r,e){const{data:s}=await g(`${m.FURNITURES}?page=${e}&limit=${f}&category=${r}`);return s}async function S(){return(await g.get(m.CATEGORIES)).data}function y(){setTimeout(()=>{a.loadMoreBtn.classList.add("is-show")},500)}function u(){a.loadMoreBtn.classList.remove("is-show")}let n=1,l="";async function I(){try{const r=await S();L(r),l="all",a.categories.children[0].classList.add("categories-item--active");const{furnitures:s}=await p();d(s),y()}catch{}finally{}}async function w(r){const e=r.target.closest(".category-item");if(!e)return;[...r.currentTarget.children].map(o=>{o.classList.remove("categories-item--active")}),v(),e.classList.add("categories-item--active"),n=1,l=e.id;try{if(l==="all"){const{furnitures:o}=await p();d(o),y()}else{const{furnitures:o,totalItems:t}=await b(l,n);if(o.length)t<f&&u(),d(o);else{u();return}}}catch{}finally{}}async function C(r){r.preventDefault(),n++;try{if(l==="all"){const{furnitures:e,totalItems:s}=await p(n);s<f*n?u():y(),d(e)}else{const{furnitures:e,totalItems:s}=await b(l,n);if(e.length)s<f&&u(),d(e);else{u();return}}}catch{}finally{}}document.addEventListener("DOMContentLoaded",I);a.categories.addEventListener("click",w);a.loadMoreBtn.addEventListener("click",C);
//# sourceMappingURL=index.js.map
