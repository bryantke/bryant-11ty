// Theme switcher
(function() {
  const STORAGE_KEY = 'theme-preference';

  const getColorPreference = () => {
    if (localStorage.getItem(STORAGE_KEY)) {
      return localStorage.getItem(STORAGE_KEY);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setPreference = (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    reflectPreference(theme);
  };

  const reflectPreference = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('#theme-toggle')?.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  };

  // Set initial theme
  reflectPreference(getColorPreference());

  // Wait for DOM to be ready
  window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#theme-toggle');

    if (themeToggle) {
      // Set initial state
      reflectPreference(getColorPreference());

      // Toggle on click
      themeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem(STORAGE_KEY) || getColorPreference();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setPreference(newTheme);
      });
    }
  });

  // Sync across tabs
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches}) => {
    const newTheme = matches ? 'dark' : 'light';
    setPreference(newTheme);
  });
})();