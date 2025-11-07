import{A as y,a as l}from"./assets/vendor-xD2YBz4L.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function c(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=c(e);fetch(e.href,s)}})();const n={categories:document.querySelector("#categories"),products:document.querySelector("#products"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more-btn"),loader:document.querySelector(".loader")};function h(r){const c=[{_id:"all",name:"Всі товари"},...r].map(({_id:t,name:e})=>`<li
        class="category-item" id="${t}"
        style="
          background-image: image-set(
            url('/img/furniture/${t}.png') 1x,
            url('/img/furniture/${t}@2x.png') 2x
          );
        "
      >
        ${e}
      </li>`).join("");n.categories.innerHTML=c}function u(r){const o=r.map(({_id:c,name:t,images:e,price:s,color:i})=>`<li class="product-item">
        <img
          class="products-image"
          src='${e[0]}'
          alt="${t}"
        />
        <div class="product-description-box">
          <h4 class="products-title">${t}</h4>
          <ul class="products-color-list">
            <li class="products-color-box" style="background-color: ${i[0]}"></li>
            <li class="products-color-box" style="background-color: ${i[1]}"></li>
            <li
              class="products-color-box"
              style="background-color: ${i[2]}"
            ></li>
          </ul>
          <p class="products-price">${s} грн</p>
        </div>
        <button class="products-details-btn" type="button">Детальніше</button>
      </li>`).join("");n.products.insertAdjacentHTML("beforeend",o)}function b(){n.products.innerHTML=""}new y(".accordion-container",{duration:300,showMultiple:!1});const L="https://furniture-store-v2.b.goit.study/api",d={FURNITURES:"/furnitures",CATEGORIES:"/categories"},E=1,f=8;l.defaults.baseURL=L;async function m(r={page:E,limit:f}){return(await l.get(d.FURNITURES,{params:r})).data}async function $(r,o){const{data:c}=await l(`${d.FURNITURES}?page=${o}&limit=${f}&category=${r}`);return c}async function I(){return(await l.get(d.CATEGORIES)).data}function p(){setTimeout(()=>{n.loadMoreBtn.classList.add("is-show")},500)}let g=1,a="";async function R(){try{const r=await I();h(r),a="all",n.categories.children[0].classList.add("categories-item--active");const{furnitures:c}=await m();u(c),p()}catch{}finally{}}async function S(r){const o=r.target.closest(".category-item");if(!o)return;[...r.currentTarget.children].map(t=>{t.classList.remove("categories-item--active")}),b(),o.classList.add("categories-item--active"),g=1,a=o.id,console.log(a);try{if(a==="all"){const{furnitures:t}=await m();u(t),p()}else{const{furnitures:t}=await $(a,g);u(t)}}catch{}finally{}}document.addEventListener("DOMContentLoaded",R);n.categories.addEventListener("click",S);
//# sourceMappingURL=index.js.map
