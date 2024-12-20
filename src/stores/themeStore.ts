import { writable } from 'svelte/store';
import { isClient } from '../utils/client';

function createThemeStore() {
  const { subscribe, set } = writable<'light' | 'dark'>(
    isClient && localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  return {
    subscribe,
    toggle: () => {
      set(current => {
        const newTheme = current === 'light' ? 'dark' : 'light';
        if (isClient) {
          localStorage.setItem('theme', newTheme);
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        return newTheme;
      });
    },
    initialize: () => {
      if (isClient) {
        const isDark = localStorage.getItem('theme') === 'dark';
        set(isDark ? 'dark' : 'light');
        if (isDark) {
          document.documentElement.classList.add('dark');
        }
      }
    }
  };
}

export const themeStore = createThemeStore();