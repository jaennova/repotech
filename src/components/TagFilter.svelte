<script lang="ts">
  import { onMount } from 'svelte';
  import { getTags } from '../services/api.service';
  import { handleClientError } from '../utils/errorHandling';
  import { resourceStore } from '../stores/resourceStore';
  import LoadingSpinner from './LoadingSpinner.svelte';
  import type { Tag } from '../types/api.types';
  
  let tags: Tag[] = [];
  let selectedTags = new Set<number>();
  let loading = true;
  let error: string | null = null;
  
  onMount(async () => {
    try {
      tags = await getTags();
    } catch (e) {
      error = e.message;
      handleClientError(e);
    } finally {
      loading = false;
    }
  });
  
  function toggleTag(tagId: number) {
    if (selectedTags.has(tagId)) {
      selectedTags.delete(tagId);
    } else {
      selectedTags.add(tagId);
    }
    selectedTags = selectedTags; // Trigger reactivity
    resourceStore.filterByTags([...selectedTags]);
  }
</script>

<div class="mb-8">
  <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Filtrar por tags</h3>
  
  {#if loading}
    <LoadingSpinner size="sm" />
  {:else if error}
    <p class="text-red-600 dark:text-red-400">{error}</p>
  {:else}
    <div class="flex flex-wrap gap-2">
      {#each tags as tag (tag.id)}
        <button
          class={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${selectedTags.has(tag.id)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          on:click={() => toggleTag(tag.id)}
        >
          {tag.nombre}
        </button>
      {/each}
    </div>
  {/if}
</div>