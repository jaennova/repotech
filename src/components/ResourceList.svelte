<script lang="ts">
  import { onMount } from 'svelte';
  import { resourceStore } from '../stores/resourceStore';
  import { getResources } from '../services/api.service';
  import { handleClientError } from '../utils/errorHandling';
  import ResourceCard from './ResourceCard.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  
  let loading = false;
  let error: string | null = null;
  
  async function loadResources() {
    try {
      loading = true;
      const resources = await getResources();
      resourceStore.setResources(resources);
    } catch (e) {
      error = e.message;
      handleClientError(e);
    } finally {
      loading = false;
    }
  }
  
  onMount(() => {
    loadResources();
  });
</script>

<div>
  {#if loading}
    <div class="flex justify-center py-8">
      <LoadingSpinner size="lg" />
    </div>
  {:else if error}
    <div class="bg-red-50 dark:bg-red-900 p-4 rounded-md">
      <p class="text-red-700 dark:text-red-100">{error}</p>
    </div>
  {:else}
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {#each $resourceStore.filteredResources as resource (resource.id)}
        <ResourceCard
          id={resource.id}
          title={resource.titulo}
          description={resource.descripcion}
          tags={resource.tags}
          url={resource.url}
        />
      {/each}
    </div>
    
    {#if $resourceStore.filteredResources.length === 0}
      <div class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">No se encontraron recursos</p>
      </div>
    {/if}
  {/if}
</div>