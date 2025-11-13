import refs from './refs';

const THEME_KEY = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

// Отримуємо поточну тему з localStorage або системну
function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    return savedTheme;
  }
  // Перевіряємо системну тему
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return THEME_DARK;
  }
  return THEME_LIGHT;
}

// Встановлюємо тему
export function setTheme(theme) {
  if (theme === THEME_DARK) {
    document.documentElement.setAttribute('data-theme', THEME_DARK);
    localStorage.setItem(THEME_KEY, THEME_DARK);
    updateThemeIcon(true);
  } else {
    document.documentElement.setAttribute('data-theme', THEME_LIGHT);
    localStorage.setItem(THEME_KEY, THEME_LIGHT);
    updateThemeIcon(false);
  }
}

// Отримуємо поточну тему
export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || THEME_LIGHT;
}

// Оновлюємо іконку теми
function updateThemeIcon(isDark) {
  const themeToggle = refs.themeToggle;
  if (!themeToggle) return;

  const sunIcon = themeToggle.querySelector('.theme-icon-sun');
  const moonIcon = themeToggle.querySelector('.theme-icon-moon');

  if (isDark) {
    // Показуємо місяць (для переключення на світлу)
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
  } else {
    // Показуємо сонце (для переключення на темну)
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
  }
}

// Переключення теми
export function toggleTheme() {
  const currentTheme = getCurrentTheme();
  if (currentTheme === THEME_DARK) {
    setTheme(THEME_LIGHT);
  } else {
    setTheme(THEME_DARK);
  }
}

// Ініціалізація теми при завантаженні
export function initTheme() {
  const initialTheme = getInitialTheme();
  setTheme(initialTheme);
}

