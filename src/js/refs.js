const modalOrder = document.querySelector('.order-modal');

const refs = {
  categories: document.querySelector('#categories'),
  products: document.querySelector('#products'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  feedbackCardList: document.querySelector('.feedback-card-list'),
  feedbackNavPrev: document.querySelector('.feedback-nav-prev'),
  feedbackNavNext: document.querySelector('.feedback-nav-next'),
  feedbackPaginationDots: document.querySelector('.feedback-pagination-dots'),
  feedbackSwiper: document.querySelector('.feedback-swiper'),
  loader: document.querySelector('.backdrope-loader'),
  backdropOrderModal: document.querySelector('.backdrop'),
  modalOrder,
  closeOrderBtn: modalOrder.querySelector('.modal-close-btn'),
  submitBtn: modalOrder.querySelector('.modal-submit-btn'),
  orderForm: modalOrder.querySelector('.modal-order-form'),
};

export default refs;
