<script lang="ts">
  import type { Tag } from '../types/api.types';
  import { fade } from 'svelte/transition';
  
  export let id: number;
  export let title: string;
  export let description: string;
  export let tags: Tag[];
  export let url: string;
</script>

<a 
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="group block h-full"
  transition:fade
>
  <article class="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 p-6 group-hover:border-blue-500 dark:group-hover:border-blue-400">
    <!-- Contenido -->
    <div class="flex flex-col h-full">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h2>
      
      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {description}
      </p>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mt-auto">
        {#each tags as tag (tag.id)}
          <span class="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
            {tag.nombre}
          </span>
        {/each}
      </div>
    </div>
    
    <!-- Icono de enlace -->
    <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <svg class="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </div>
  </article>
</a>