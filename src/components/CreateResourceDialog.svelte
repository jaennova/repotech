<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { createResource } from '../services/api.service';
  import { validateResourceCreate } from '../utils/validation';
  
  const dispatch = createEventDispatcher();

  export let isOpen = false;

    onMount(() => {
    window.addEventListener('openCreateDialog', () => {
      isOpen = true;
    });
  });
  
  let formData = {
    titulo: '',
    descripcion: '',
    url: '',
    tags: ''
  };
  
  let loading = false;
  let error: string | null = null;
  
  function close() {
    isOpen = false;
    dispatch('close');
  }
  
  async function handleSubmit() {
    error = null;
    loading = true;
    
    const tags = formData.tags.split(',').map(tag => tag.trim());
    const data = {
      ...formData,
      tags
    };
    
    const errors = validateResourceCreate(data);
    if (errors.length > 0) {
      error = errors.join('\n');
      loading = false;
      return;
    }
    
    try {
      await createResource(data);
      close();
      dispatch('success');
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 overflow-y-auto" transition:fade>
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" on:click={close}></div>
    
    <!-- Dialog -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <div
        class="relative w-full max-w-lg rounded-xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all"
        transition:scale={{duration: 200, start: 0.95}}
      >
        <!-- Header -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Crear nuevo recurso
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Comparte un recurso útil con la comunidad
          </p>
        </div>
        
        <!-- Form -->
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              bind:value={formData.titulo}
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Nombre del recurso"
            />
          </div>
          
          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción
            </label>
            <textarea
              id="descripcion"
              bind:value={formData.descripcion}
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe brevemente el recurso"
            ></textarea>
          </div>
          
          <div>
            <label for="url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL
            </label>
            <input
              type="url"
              id="url"
              bind:value={formData.url}
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://ejemplo.com"
            />
          </div>
          
          <div>
            <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              bind:value={formData.tags}
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="javascript, react, node"
            />
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Separa los tags con comas
            </p>
          </div>
          
          {#if error}
            <div class="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
              <p class="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          {/if}
          
          <!-- Actions -->
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              on:click={close}
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              class="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if loading}
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              {/if}
              Crear recurso
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}