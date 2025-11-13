import { hideLoader, showError, showLoader, showSuccess, showWarning } from './helpers';
import refs from './refs';
import { createOrder } from './products-api';

let currentModelId = null;
let currentColor = null;

function clearFormStorage() {
  localStorage.removeItem('order-form');
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

  // Видаляємо всі символи, крім цифр та "+"
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  // Перевіряємо формат: опціональний "+" на початку, потім від 9 до 15 цифр
  // Дозволяємо формати:
  // - +380123456789 (з + та країнним кодом)
  // - 380123456789 (без +, але з країнним кодом)
  // - 0123456789 (локальний формат)
  // - +1234567890 (міжнародний формат)
  const phonePattern = /^\+?\d{9,15}$/;

  if (!phonePattern.test(cleanPhone)) {
    showWarning('Enter a valid phone number (9-15 digits, optional + at start).');
    return false;
  }

  // Повертаємо номер як є (з "+" якщо він був)
  return cleanPhone;
}

export function setupOrderFormStorage() {
  refs.orderForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      // Збираємо всі дані форми в один об'єкт
      const formData = {};
      refs.orderForm.querySelectorAll('input, textarea').forEach(f => {
        if (f.name) {
          formData[f.name] = f.value;
        }
      });
      // Зберігаємо весь об'єкт під ключем "order-form"
      localStorage.setItem('order-form', JSON.stringify(formData));
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
  const savedData = localStorage.getItem('order-form');
  if (savedData) {
    try {
      const formData = JSON.parse(savedData);
      refs.orderForm.querySelectorAll('input, textarea').forEach(field => {
        if (field.name && formData[field.name] !== undefined) {
          field.value = formData[field.name];
        }
      });
    } catch (error) {
      console.error('Помилка при відновленні даних форми:', error);
    }
  }
}

