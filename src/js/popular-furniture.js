import refs from './refs.js';
import { FURNITURE_LIMIT } from './constants.js';

// Параметри пагінації популярних товарів
const POPULAR_ITEMS_PER_PAGE = 4;
let currentPopularPage = 0;
let allPopularFurnitures = [];

/**
 * Ініціалізація пагінації популярних товарів
 * @param {Array} furnitures - Масив усіх популярних товарів
 */
export function initPopularPagination(furnitures = []) {
  allPopularFurnitures = furnitures;
  currentPopularPage = 0;

  renderPopularPage(0);
  updatePopularPaginationDots();
  setupPopularNavigationListeners();
}

/**
 * Отримання товарів для поточної сторінки
 * @param {number} pageIndex - Індекс сторінки (0-based)
 * @returns {Array} Масив товарів для сторінки
 */
function getPopularPageItems(pageIndex) {
  const startIndex = pageIndex * POPULAR_ITEMS_PER_PAGE;
  const endIndex = startIndex + POPULAR_ITEMS_PER_PAGE;
  return allPopularFurnitures.slice(startIndex, endIndex);
}

/**
 * Отримання кількості сторінок
 */
function getTotalPopularPages() {
  return Math.ceil(allPopularFurnitures.length / POPULAR_ITEMS_PER_PAGE);
}

/**
 * Відображення товарів для конкретної сторінки
 * @param {number} pageIndex - Індекс сторінки
 */
function renderPopularPage(pageIndex) {
  const totalPages = getTotalPopularPages();

  // Валідація індексу сторінки
  if (pageIndex < 0 || pageIndex >= totalPages) {
    return;
  }

  currentPopularPage = pageIndex;

  // Очистка контейнера
  if (refs.popularProducts) {
    refs.popularProducts.innerHTML = '';
  }

  // Отримання товарів для сторінки
  const pageItems = getPopularPageItems(pageIndex);

  // Генерування HTML розмітки для товарів
  const markup = pageItems
    .map(item => {
      return `<li class="product-item" data-id="${item._id}">
      <img
        class="products-image"
        src='${item.images[0]}'
        alt="${item.name}"
      />
      <div class="product-description-box">
        <h4 class="products-title">${item.name}</h4>
        <ul class="products-color-list">
          ${item.color
            .map(
              hex =>
                `<li class="products-color-box" style="background-color: ${hex}"></li>`
            )
            .join('')}
        </ul>
        <p class="products-price">${item.price} грн</p>
      </div>
      <button class="products-details-btn" type="button">Детальніше</button>
    </li>`;
    })
    .join('');

  // Вставлення розмітки
  if (refs.popularProducts) {
    refs.popularProducts.insertAdjacentHTML('beforeend', markup);
  }

  // Оновлення пагінації
  updatePopularPaginationDots();
  updatePopularNavigationButtons();
}

/**
 * Оновлення точок пагінації
 */
function updatePopularPaginationDots() {
  const totalPages = getTotalPopularPages();

  if (!refs.popularPaginationDots) {
    return;
  }

  // Очистка точок
  refs.popularPaginationDots.innerHTML = '';

  // Створення точок для кожної сторінки
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('li');
    dot.className = i === currentPopularPage ? 'active' : '';
    dot.setAttribute('data-page', i);
    dot.setAttribute('aria-label', `Page ${i + 1}`);
    dot.setAttribute('role', 'button');

    dot.addEventListener('click', () => {
      renderPopularPage(i);
    });

    refs.popularPaginationDots.appendChild(dot);
  }
}

/**
 * Оновлення стану кнопок навігації
 */
function updatePopularNavigationButtons() {
  const totalPages = getTotalPopularPages();
  const isFirstPage = currentPopularPage === 0;
  const isLastPage = currentPopularPage === totalPages - 1;

  if (refs.popularNavPrev) {
    if (isFirstPage) {
      refs.popularNavPrev.setAttribute('disabled', 'true');
      refs.popularNavPrev.classList.add('disabled');
      refs.popularNavPrev.setAttribute('aria-disabled', 'true');
    } else {
      refs.popularNavPrev.removeAttribute('disabled');
      refs.popularNavPrev.classList.remove('disabled');
      refs.popularNavPrev.setAttribute('aria-disabled', 'false');
    }
  }

  if (refs.popularNavNext) {
    if (isLastPage) {
      refs.popularNavNext.setAttribute('disabled', 'true');
      refs.popularNavNext.classList.add('disabled');
      refs.popularNavNext.setAttribute('aria-disabled', 'true');
    } else {
      refs.popularNavNext.removeAttribute('disabled');
      refs.popularNavNext.classList.remove('disabled');
      refs.popularNavNext.setAttribute('aria-disabled', 'false');
    }
  }
}

/**
 * Налаштування слухачів подій для навігації
 */
function setupPopularNavigationListeners() {
  if (refs.popularNavPrev) {
    refs.popularNavPrev.addEventListener('click', () => {
      if (currentPopularPage > 0) {
        renderPopularPage(currentPopularPage - 1);
      }
    });
  }

  if (refs.popularNavNext) {
    refs.popularNavNext.addEventListener('click', () => {
      const totalPages = getTotalPopularPages();
      if (currentPopularPage < totalPages - 1) {
        renderPopularPage(currentPopularPage + 1);
      }
    });
  }
}
