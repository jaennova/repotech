import { writable } from 'svelte/store';

function createThemeStore() {
  const { subscribe, set } = writable<'light' | 'dark'>(
    typeof window !== 'undefined' 
      ? window.localStorage.getItem('theme') as 'light' | 'dark' || 'light'
      : 'light'
  );

  return {
    subscribe,
    toggle: () => {
      set(current => {
        const newTheme = current === 'light' ? 'dark' : 'light';
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('theme', newTheme);
          document.documentElement.classList.toggle('dark');
        }
        return newTheme;
      });
    },
    initialize: () => {
      if (typeof window !== 'undefined') {
        const theme = window.localStorage.getItem('theme') as 'light' | 'dark' || 'light';
        set(theme);
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      }
    }
  };
}

export const themeStore = createThemeStore();