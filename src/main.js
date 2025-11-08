import {
  handlerClickCategory,
  initialHome,
  onLoadMoreClick,
} from './js/handlers';
import refs from './js/refs';

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  });
});

document.addEventListener('DOMContentLoaded', initialHome);
refs.categories.addEventListener('click', handlerClickCategory);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
import { openProductModal } from './js/modal.js';

const grid = document.getElementById('products');

if (grid) {
  grid.addEventListener('click', e => {
    const trigger = e.target.closest('.products-details-btn, .products-image');
    if (!trigger) return;
    const card = trigger.closest('.product-item');
    if (!card) return;
    const id = card.dataset.id; //
    if (!id) {
      console.warn('Не знайдено data-id на .product-item');
      return;
    }
    e.preventDefault(); 
    openProductModal(id);
  });
}
