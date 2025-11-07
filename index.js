import{A as y,a as u}from"./assets/vendor-xD2YBz4L.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const c of e)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const c={};return e.integrity&&(c.integrity=e.integrity),e.referrerPolicy&&(c.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?c.credentials="include":e.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function t(e){if(e.ep)return;e.ep=!0;const c=s(e);fetch(e.href,c)}})();const i={categories:document.querySelector("#categories"),products:document.querySelector("#products"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more-btn"),loader:document.querySelector(".loader"),feedbackCardList:document.querySelector(".feedback-card-list"),feedbackNavPrev:document.querySelector(".feedback-nav-prev"),feedbackNavNext:document.querySelector(".feedback-nav-next")};function b(r){const s=[{_id:"all",name:"Всі товари"},...r].map(({_id:t,name:e})=>`<li
        class="category-item" id="${t}"
        style="
          background-image: image-set(
            url('img/furniture/${t}.png') 1x,
            url('img/furniture/${t}@2x.png') 2x
          );
        "
      >
        ${e}
      </li>`).join("");i.categories.innerHTML=s}function l(r){const o=r.map(({_id:s,name:t,images:e,price:c,color:a})=>`<li class="product-item">
        <img
          class="products-image"
          src='${e[0]}'
          alt="${t}"
        />
        <div class="product-description-box">
          <h4 class="products-title">${t}</h4>
          <ul class="products-color-list">
            <li class="products-color-box" style="background-color: ${a[0]}"></li>
            <li class="products-color-box" style="background-color: ${a[1]}"></li>
            <li
              class="products-color-box"
              style="background-color: ${a[2]}"
            ></li>
          </ul>
          <p class="products-price">${c} грн</p>
        </div>
        <button class="products-details-btn" type="button">Детальніше</button>
      </li>`).join("");i.products.insertAdjacentHTML("beforeend",o)}function h(){i.products.innerHTML=""}new y(".accordion-container",{duration:300,showMultiple:!1});const L="https://furniture-store-v2.b.goit.study/api",d={FURNITURES:"/furnitures",CATEGORIES:"/categories"},S=1,g=8;u.defaults.baseURL=L;async function m(r={page:S,limit:g}){return(await u.get(d.FURNITURES,{params:r})).data}async function v(r,o){const{data:s}=await u(`${d.FURNITURES}?page=${o}&limit=${g}&category=${r}`);return s}async function E(){return(await u.get(d.CATEGORIES)).data}function p(){setTimeout(()=>{i.loadMoreBtn.classList.add("is-show")},500)}let f=1,n="";async function $(){try{const r=await E();b(r),n="all",i.categories.children[0].classList.add("categories-item--active");const{furnitures:s}=await m();l(s),p()}catch{}finally{}}async function C(r){const o=r.target.closest(".category-item");if(!o)return;[...r.currentTarget.children].map(t=>{t.classList.remove("categories-item--active")}),h(),o.classList.add("categories-item--active"),f=1,n=o.id,console.log(n);try{if(n==="all"){const{furnitures:t}=await m();l(t),p()}else{const{furnitures:t}=await v(n,f);l(t)}}catch{}finally{}}document.addEventListener("DOMContentLoaded",$);i.categories.addEventListener("click",C);
//# sourceMappingURL=index.js.map
