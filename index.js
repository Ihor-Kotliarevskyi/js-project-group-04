import{A as p,a as i}from"./assets/vendor-xD2YBz4L.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const f="https://furniture-store-v2.b.goit.study/api",l={FURNITURES:"/furnitures/",CATEGORIES:"/categories"},a=1,u=8,d={categories:document.querySelector("#categories"),products:document.querySelector("#products"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),loadMoreBtn:document.querySelector(".load-more-btn"),loader:document.querySelector(".loader")};function g(o){const t=[{_id:"all",name:"Всі товари"},...o];console.log(t);const c=t.map(({_id:s,name:e})=>`<li
        class="category-item"
        style="
          background-image: image-set(
            url('/img/furniture/${s}.png') 1x,
            url('/img/furniture/${s}@2x.png') 2x
          );
        "
      >
        ${e}
      </li>`).join("");d.categories.innerHTML=c}function m(o){const t=o.map(({_id:c,name:s,images:e,price:r,color:n})=>`<li class="product-item">
        <img
          class="products-image"
          src='${e[0]}'
          alt="${s}"
        />
        <div class="product-description-box">
          <h4 class="products-title">${s}</h4>
          <ul class="products-color-list">
            <li class="products-color-box" style="background-color: ${n[0]}"></li>
            <li class="products-color-box" style="background-color: ${n[1]}"></li>
            <li
              class="products-color-box"
              style="background-color: ${n[2]}"
            ></li>
          </ul>
          <p class="products-price">${r} грн</p>
        </div>
        <button class="products-details-btn" type="button">Детальніше</button>
      </li>`).join("");d.products.insertAdjacentHTML("beforeend",t)}new p(".accordion-container",{duration:300,showMultiple:!1});i.defaults.baseURL=f;async function y(o={page:a,limit:u}){return(await i.get(l.FURNITURES,{params:o})).data}async function b(){return(await i.get(l.CATEGORIES)).data}async function E(){try{const o=await b();g(o),m(products)}catch{}finally{}}async function L(o={page:a,limit:u}){try{const t=await y(o);return console.log("Furnitures:",t),t}catch(t){return console.error("Furnitures downloading error:",t),null}}document.addEventListener("DOMContentLoaded",E);document.addEventListener("DOMContentLoaded",async()=>{console.log("Перевірка API...");const o=await L({page:a,limit:u});console.log("Меблі:",o)});
//# sourceMappingURL=index.js.map
