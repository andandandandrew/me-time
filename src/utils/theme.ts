/**
 * Theme utility functions for managing light/dark mode
 */

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

/**
 * Get the current theme from localStorage or system preference
 */
export function getInitialTheme(): Theme {
  // Check localStorage first
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  // Fall back to system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

/**
 * Apply theme to the document
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
}

/**
 * Set theme and persist to localStorage
 */
export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}

/**
 * Initialize theme on page load
 */
export function initTheme(): Theme {
  const theme = getInitialTheme();
  applyTheme(theme);
  return theme;
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(currentTheme: Theme): Theme {
  const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
}

