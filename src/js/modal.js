

// order-modal

const backdropOrderModal = document.querySelector('.backdrop');
const modalOrder = document.querySelector('.order-modal');
const closeOrderBtn = document.querySelector('.modal-close-btn');
const submitBtn = document.querySelector('.modal-submit-btn');

function openOrderModal() {
    backdropOrderModal.classList.add('is-open');
    document.body.classList.add('modal-open');

    window.addEventListener('keydown', handleEscape);
}

function closeOrderModal() {
    backdropOrderModal.classList.remove('is-open');
    document.body.classList.remove('modal-open');

    window.removeEventListener('keydown', handleEscape);
}

closeOrderBtn.addEventListener('click', closeOrderModal);

backdropOrderModal.addEventListener('click', (event) => {
    if (event.target === backdropOrderModal) {
        closeOrderModal();
    }
});

function handleEscape(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        closeOrderModal();
    }
}


// тестова кнопка для відкриття модалки
document.querySelector('.open-modal-btn')?.addEventListener('click', openOrderModal);