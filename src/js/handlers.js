import {
  clearFurnitures,
  renderCategories,
  renderFurnitures,
} from './render-function.js';
import {
  getFurnitures,
  getCategories,
  getFurnituresByCategories,
} from './products-api.js';
import { FURNITURE_LIMIT } from './constants.js';
import refs from './refs.js';
import {
  hideLoader,
  hideLoadMoreBtn,
  showError,
  showInfo,
  showLoader,
  showLoadMoreBtn,
  showWarning,
} from './helpers.js';
import { openProductModal, closeProductModal } from './product-modal.js';
import { closeOrderModal, openOrderModal } from './order-modal.js';

let currentPage = 1;
let currentCategory = '';

export async function initialHome() {
  try {
    showLoader();
    const categories = await getCategories();
    renderCategories(categories);

    currentCategory = 'all';
    const allCategoryItem = refs.categories.children[0];
    allCategoryItem.classList.add('categories-item--active');

    const { furnitures } = await getFurnitures();
    renderFurnitures(furnitures);
    showLoadMoreBtn();
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

export async function handlerClickCategory(event) {
  const item = event.target.closest('.category-item');
  if (!item) {
    return;
  }

  const categoriesChildrenArrey = [...event.currentTarget.children];
  categoriesChildrenArrey.map(child => {
    child.classList.remove('categories-item--active');
  });

  clearFurnitures();
  item.classList.add('categories-item--active');
  currentPage = 1;
  currentCategory = item.id;
  showLoader();
  try {
    if (currentCategory === 'all') {
      const { furnitures } = await getFurnitures();
      renderFurnitures(furnitures);
      showLoadMoreBtn();
    } else {
      const { furnitures, totalItems } = await getFurnituresByCategories(
        currentCategory,
        currentPage
      );
      if (!furnitures.length) {
        hideLoadMoreBtn();
        showInfo(`Furnitures in "${item.textContent}" categories is not found`);
        return;
      } else {
        if (totalItems < FURNITURE_LIMIT) {
          hideLoadMoreBtn();
          showInfo(
            `Ended furnitures collections in "${item.textContent}" categories`
          );
        }
        renderFurnitures(furnitures);
      }
    }
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

export async function onLoadMoreClick(event) {
  event.preventDefault();
  currentPage++;
  showLoader();

  try {
    if (currentCategory === 'all') {
      const { furnitures, totalItems } = await getFurnitures(currentPage);
      if (totalItems < FURNITURE_LIMIT * currentPage) {
        hideLoadMoreBtn();
        showInfo('End collections');
      } else {
        showLoadMoreBtn();
      }
      renderFurnitures(furnitures);
    } else {
      const { furnitures, totalItems } = await getFurnituresByCategories(
        currentCategory,
        currentPage
      );

      if (!furnitures.length) {
        hideLoadMoreBtn();
        showInfo(`Furnitures is not found`);
        return;
      } else {
        if (totalItems < FURNITURE_LIMIT) {
          hideLoadMoreBtn();
          showInfo('End collections');
        }
        renderFurnitures(furnitures);
      }
    }
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

export const onProductsClick = e => {
  const btn = e.target.closest('.products-details-btn');
  if (!btn) return;

  const card = btn.closest('.product-item');
  if (!card) return;

  let id = card.dataset.id;

  if (!id) {
    const img = card.querySelector('img[src*="/furniture/"]');
    const src = img?.getAttribute('src') || '';
    const m = src.match(/\/([a-f0-9]{24})_/i);
    if (m) id = m[1];
  }

  if (!id) {
    showWarning('ID not found');
    return;
  }

  e.preventDefault();
  openProductModal(id);
};

// ===== Глобальні колбеки =====

export function handleWindowLoad() {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  });
}

// ===== Колбеки для Burger Menu =====

export function handleBurgerMenuOpen(menu, body, openMenuBtn, closeBtn) {
  menu.classList.add('is-open');
  body.classList.add('no-scroll');
  openMenuBtn.style.display = 'none';
  closeBtn.style.display = 'flex';
}

export function handleBurgerMenuClose(menu, body, openMenuBtn, closeBtn) {
  menu.classList.remove('is-open');
  body.classList.remove('no-scroll');
  openMenuBtn.style.display = 'flex';
  closeBtn.style.display = 'none';
}

export function handleBurgerMenuEscKey(e, menu, closeMenuFn) {
  if (e.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenuFn();
  }
}

// ===== Колбеки для Product Modal =====

export function handleProductModalBackdrop(e) {
  if (e.target === refs.productModal) {
    closeProductModal();
  }
}

export function handleProductModalEsc(e) {
  if (e.key === 'Escape') {
    closeProductModal();
  }
}

export function handleProductModalOrderBtn(productId) {
  const checked = refs.productModal.querySelector('input[name="color"]:checked');
  const color = checked ? checked.value : null;
  closeProductModal();
  openOrderModal(productId, null, color);
}

export function handleProductModalThumbClick(e, mainImg) {
  const img = e.target.closest('.modal-thumb');
  if (!img || !mainImg) return;
  const tmp = mainImg.src;
  mainImg.src = img.src;
  img.src = tmp;
}

// ===== Колбеки для Order Modal =====

export function handleOrderModalEsc(e) {
  if (e.key === 'Escape') {
    closeOrderModal();
  }
}

export function handleOrderModalCloseBtn() {
  closeOrderModal();
}

export function handleOrderModalBackdrop(e) {
  if (e.target === refs.backdropOrderModal) {
    closeOrderModal();
  }
}
