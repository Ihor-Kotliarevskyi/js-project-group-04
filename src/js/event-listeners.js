import refs from './refs';
import {
  handlerClickCategory,
  initialHome,
  onLoadMoreClick,
  onProductsClick,
  handleWindowLoad,
  handleBurgerMenuOpen,
  handleBurgerMenuClose,
  handleBurgerMenuEscKey,
  handleProductModalBackdrop,
  handleProductModalEsc,
  handleProductModalOrderBtn,
  handleProductModalThumbClick,
  handleOrderModalEsc,
  handleOrderModalCloseBtn,
  handleOrderModalBackdrop,
} from './handlers';
import { initFeedbacks } from './feedback';
import { closeProductModal } from './product-modal';
import {
  closeOrderModal,
  handleOrderFormSubmit,
  setupOrderFormStorage,
} from './order-modal';
import { initTheme, toggleTheme } from './theme';

// ===== Глобальні слухачі =====

// Прокрутка сторінки на початок при завантаженні
window.addEventListener('load', handleWindowLoad);

// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initialHome();
  initFeedbacks();
  initBurgerMenu();
  initProductsListeners();
  initCategoriesListeners();
  initLoadMoreListeners();
  initOrderModalStaticListeners();
  initOrderFormListeners();
  initThemeToggle();
});

// ===== Слухачі для категорій =====
function initCategoriesListeners() {
  if (refs.categories && !refs.categories.dataset.bound) {
    refs.categories.addEventListener('click', handlerClickCategory);
    refs.categories.dataset.bound = '1';
  }
}

// ===== Слухачі для кнопки "Завантажити ще" =====
function initLoadMoreListeners() {
  if (refs.loadMoreBtn && !refs.loadMoreBtn.dataset.bound) {
    refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
    refs.loadMoreBtn.dataset.bound = '1';
  }
}

// ===== Слухачі для продуктів =====
function initProductsListeners() {
  const productsEl = refs.products || document.getElementById('products');
  if (productsEl && productsEl.dataset.boundModal !== '1') {
    productsEl.addEventListener('click', onProductsClick);
    productsEl.dataset.boundModal = '1';
  }

  // Слухачі для популярних товарів
  const popularProductsEl =
    refs.popularProducts || document.getElementById('popular-products');
  if (popularProductsEl && popularProductsEl.dataset.boundModal !== '1') {
    popularProductsEl.addEventListener('click', onProductsClick);
    popularProductsEl.dataset.boundModal = '1';
  }
}

// ===== Слухачі для Burger Menu =====
function initBurgerMenu() {
  const openMenuBtn = refs.burgerMenuOpenBtn;
  const menu = refs.burgerMenu;
  const headerNav = refs.burgerMenuHeaderNav;
  const burgerMenuHeaderButton = refs.burgerMenuHeaderButton;
  const body = refs.body;

  if (!openMenuBtn || !menu || !headerNav) {
    console.warn('Не знайдено елементи меню або хедеру');
    return;
  }

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('burger-menu-navbar-btn-close');
  closeBtn.setAttribute('type', 'button');
  closeBtn.setAttribute('data-navbar-close', '');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('burger-button-icon');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'href',
    '/img/sprite.svg#x'
  );

  svg.appendChild(use);
  closeBtn.appendChild(svg);

  openMenuBtn.insertAdjacentElement('beforebegin', closeBtn);

  const closeMenu = () => {
    handleBurgerMenuClose(menu, body, openMenuBtn, closeBtn);
  };

  openMenuBtn.addEventListener('click', () => {
    handleBurgerMenuOpen(menu, body, openMenuBtn, closeBtn);
  });

  closeBtn.addEventListener('click', closeMenu);
  burgerMenuHeaderButton?.addEventListener('click', closeMenu);

  const menuLinks = menu.querySelectorAll('.nav-link');
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', e => {
    handleBurgerMenuEscKey(e, menu, closeMenu);
  });

  closeBtn.style.display = 'none';
}

// ===== Слухачі для Product Modal =====
let productModalEscHandler = null;
let productModalBackdropHandler = null;

export function setupProductModalListeners(modalRefs, productId) {
  const { btnClose, orderBtn, dialog, thumbsWrap, mainImg } = modalRefs;

  // Закриття по кнопці
  if (btnClose) {
    btnClose.onclick = closeProductModal;
  }

  // Закриття по кліку на backdrop
  productModalBackdropHandler = handleProductModalBackdrop;
  refs.productModal.addEventListener('mousedown', productModalBackdropHandler);

  // Закриття по Escape
  productModalEscHandler = handleProductModalEsc;
  document.addEventListener('keydown', productModalEscHandler);

  // Кнопка "Перейти до замовлення"
  if (orderBtn) {
    orderBtn.onclick = () => handleProductModalOrderBtn(productId);
  }

  // Обробка кліку на мініатюри зображень
  if (thumbsWrap && !thumbsWrap.dataset.bound) {
    thumbsWrap.addEventListener('click', e => {
      handleProductModalThumbClick(e, mainImg);
    });
    thumbsWrap.dataset.bound = '1';
  }

  // Фокус на діалог
  if (dialog) {
    dialog.setAttribute('tabindex', '-1');
    dialog.focus({ preventScroll: true });
  }
}

export function removeProductModalListeners() {
  if (productModalEscHandler) {
    document.removeEventListener('keydown', productModalEscHandler);
    productModalEscHandler = null;
  }

  if (productModalBackdropHandler) {
    refs.productModal.removeEventListener(
      'mousedown',
      productModalBackdropHandler
    );
    productModalBackdropHandler = null;
  }
}

// ===== Слухачі для Order Modal =====
let orderModalEscHandler = null;

export function setupOrderModalListeners() {
  // Закриття по Escape (встановлюється при відкритті модалки)
  orderModalEscHandler = handleOrderModalEsc;
  window.addEventListener('keydown', orderModalEscHandler);
}

export function removeOrderModalListeners() {
  if (orderModalEscHandler) {
    window.removeEventListener('keydown', orderModalEscHandler);
    orderModalEscHandler = null;
  }
}

// Статичні слухачі для Order Modal (встановлюються один раз)
function initOrderModalStaticListeners() {
  // Закриття по кнопці
  refs.closeOrderBtn?.addEventListener('click', handleOrderModalCloseBtn);

  // Закриття по кліку на backdrop
  refs.backdropOrderModal?.addEventListener(
    'mousedown',
    handleOrderModalBackdrop
  );
}

// ===== Слухачі для форми замовлення =====
function initOrderFormListeners() {
  // Збереження полів у localStorage
  setupOrderFormStorage();

  // Відправка форми
  refs.orderForm?.addEventListener('submit', handleOrderFormSubmit);
}

// ===== Слухачі для переключення теми =====
function initThemeToggle() {
  refs.themeToggle?.addEventListener('click', toggleTheme);
}
