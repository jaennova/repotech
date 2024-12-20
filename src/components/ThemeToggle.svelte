<script lang="ts">
  import { writable, get } from 'svelte/store';
  import { onMount } from 'svelte';

  const THEME_KEY = 'theme'; // Clave para localStorage

  const themeStore = writable<'light' | 'dark'>('light');

  const initializeTheme = () => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      themeStore.set(storedTheme === 'dark' ? 'dark' : 'light');
    } else {
        // Establecer el tema por defecto al iniciar por primera vez.
        themeStore.set('light');
        localStorage.setItem(THEME_KEY, 'light'); // Guarda el valor inicial en localStorage
    }
    document.documentElement.classList.toggle('dark', get(themeStore) === 'dark'); // Aplica el tema al iniciar
  };

  const toggleTheme = () => {
    themeStore.update(currentTheme => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Aplica el tema al cambiar
      return newTheme;
    });
  };

  onMount(initializeTheme);
</script>

<button
  on:click={toggleTheme}
  class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
  aria-label="Cambiar tema"
>
  {#if $themeStore === 'light'}
    <svg class="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
    </svg>
  {:else}
    <svg class="w-5 h-5 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
    </svg>
  {/if}
</button>