import { hideLoader, showError, showLoader, showSuccess, showWarning } from './helpers';
import refs from './refs';
import { createOrder } from './products-api';

let currentModelId = null;
let currentColor = null;

function clearFormStorage() {
  refs.orderForm
    .querySelectorAll('input, textarea')
    .forEach(field => localStorage.removeItem(field.name));
}

function validateForm(name, phone) {
  if (!name || !phone) {
    showWarning('Please fill in your name and phone number.');
    return false;
  }

  if (!currentModelId) {
    showWarning('Choose a product before ordering.');
    return false;
  }

  const clearPhone = phone.replace(/[^\d+]/g, '');
  const phonePattern = /^\+?\d{10,12}$/;

  if (!phonePattern.test(clearPhone)) {
    showWarning('Enter a valid phone number.');
    return false;
  }

  return clearPhone;
}

export function setupOrderFormStorage() {
  refs.orderForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', e => {
      localStorage.setItem(e.target.name, e.target.value);
    });
  });
}

export async function handleOrderFormSubmit(e) {
  e.preventDefault();
  
  const name = refs.orderForm.elements['user-name']?.value.trim();
  const phone = refs.orderForm.elements['user-phone']?.value.trim();
  const comment = refs.orderForm.elements['user-comment']?.value.trim() || '';

  const validatedPhone = validateForm(name, phone);
  if (!validatedPhone) return;

  const payload = {
    name,
    phone: validatedPhone,
    comment: 'empty',
    modelId: currentModelId,
    color: currentColor,
  };

  refs.submitBtn.disabled = true;

  try {
    showLoader();
    await createOrder(payload);
    showSuccess('Your order has been sent!');
    refs.orderForm.reset();
    clearFormStorage();
    closeOrderModal();
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
    refs.submitBtn.disabled = false;
  }
}

import { setupOrderModalListeners, removeOrderModalListeners } from './event-listeners';

export async function openOrderModal(modelId, marker, color) {
  document.body.classList.add('modal-open');
  currentModelId = modelId ?? null;
  currentColor = color ?? null;
  refs.backdropOrderModal.classList.add('is-open');
  
  restoreFormFromStorage();
  setupOrderModalListeners();
}

export async function closeOrderModal() {
  document.body.classList.remove('modal-open');
  refs.backdropOrderModal.classList.remove('is-open');
  removeOrderModalListeners();
}

export function restoreFormFromStorage() {
  refs.orderForm.querySelectorAll('input, textarea').forEach(field => {
    const saved = localStorage.getItem(field.name);
    if (saved) {
      field.value = saved;
    }
  });
}

