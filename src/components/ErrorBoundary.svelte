<script lang="ts">
  import { onMount } from 'svelte';
  import { handleClientError } from '../utils/errorHandling';
  
  export let fallback: string = 'Ha ocurrido un error. Por favor, intenta nuevamente.';
  
  let error: string | null = null;
  let hasError = false;
  
  onMount(() => {
    window.addEventListener('error', (event) => {
      hasError = true;
      error = event.error?.message || fallback;
      handleClientError(event.error);
    });
    
    return () => {
      window.removeEventListener('error', () => {});
    };
  });
</script>

{#if hasError}
  <div class="bg-red-50 border border-red-200 rounded-md p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">Error</h3>
        <p class="mt-2 text-sm text-red-700">{error || fallback}</p>
        <button
          class="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
          on:click={() => window.location.reload()}
        >
          Recargar página
        </button>
      </div>
    </div>
  </div>
{:else}
  <slot />
{/if}