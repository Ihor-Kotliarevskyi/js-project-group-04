// Хендлери, які передаються в addEventListener.

import { getCategories } from './products-api';
import { renderCategories, renderProducts } from './render-function';

let currentPage = 1;
let currentCategory = '';

export async function initialHome() {
  try {
    const categories = await getCategories();

    renderCategories(categories);

    // currentCategory = 'all';
    // const allCategoryItem = refs.categories.children[0].children[0];
    // allCategoryItem.classList.add('categories-item--active');
    // showLoader();
    // const { products, total, limit, skip } = await getProducts(currentPage);
    renderProducts(products);
    // showLoadMoreBtn();
  } catch (error) {
    // showError(error);
  } finally {
    // hideLoader();
  }
}
