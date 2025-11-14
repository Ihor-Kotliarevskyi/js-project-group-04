// Order Modal
const modalOrder = document.querySelector('.order-modal');

// Product Modal
const productModal = document.querySelector('.modal-window');

const refs = {
  // Categories & Products
  categories: document.querySelector('#categories'),
  products: document.querySelector('#products'),
  popularProducts: document.querySelector('#popular-products'),
  loadMoreBtn: document.querySelector('.load-more-btn'),

  // Popular Furniture
  popularNavPrev: document.querySelector('.popular-nav-prev'),
  popularNavNext: document.querySelector('.popular-nav-next'),
  popularPaginationDots: document.querySelector('.popular-pagination-dots'),

  // Feedback
  feedbackCardList: document.querySelector('.feedback-card-list'),
  feedbackNavPrev: document.querySelector('.feedback-nav-prev'),
  feedbackNavNext: document.querySelector('.feedback-nav-next'),
  feedbackPaginationDots: document.querySelector('.feedback-pagination-dots'),
  feedbackSwiper: document.querySelector('.feedback-swiper'),

  // Loader
  loader: document.querySelector('.backdrope-loader'),

  // Order Modal
  backdropOrderModal: document.querySelector('.backdrop'),
  modalOrder,
  closeOrderBtn: modalOrder?.querySelector('.modal-close-btn'),
  submitBtn: modalOrder?.querySelector('.modal-submit-btn'),
  orderForm: modalOrder?.querySelector('.modal-order-form'),

  // Product Modal
  productModal,
  productModalDialog: productModal?.querySelector('.product-modalWindow'),
  productModalMainImg: productModal?.querySelector('.modal-image-0'),
  productModalThumbsWrap: productModal?.querySelector('.modal-bottom-row'),
  productModalTitle: productModal?.querySelector('.product-modal-title'),
  productModalCategory: productModal?.querySelector('.modal-description'),
  productModalPrice: productModal?.querySelector('.modal-price'),
  productModalStars: productModal?.querySelector('.modal-rating-stars'),
  productModalColorsWrap: productModal?.querySelector('.radio-group'),
  productModalDescription: productModal?.querySelector('.furnitureDescription'),
  productModalSize: productModal?.querySelector('.furnitureSize'),
  productModalCloseBtn: productModal?.querySelector('.modal-close-btn'),
  productModalOrderBtn: productModal?.querySelector('.modalButton'),

  // Burger Menu
  burgerMenuOpenBtn: document.querySelector('[data-menu-open]'),
  burgerMenu: document.querySelector('.burger-menu'),
  burgerMenuHeaderNav: document.querySelector('.header-nav'),
  burgerMenuHeaderButton: document.querySelector('.burger-menu-header-button'),
  body: document.body,

  // Theme Toggle
  themeToggle: document.querySelector('[data-theme-toggle]'),
};

export default refs;
