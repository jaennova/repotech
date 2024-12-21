<script lang="ts">
  import type { Tag } from '../types/api.types';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  export const id: number = 0;
  export let title: string;
  export let description: string;
  export let tags: Tag[];
  export let url: string;
  
  let backgroundImage: string | null = null;
  
  function getDomain(url: string) {
    try {
      return new URL(url).hostname;
    } catch {
      return null;
    }
  }

  async function checkImageExists(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async function getFaviconUrl(url: string) {
    const domain = getDomain(url);
    if (!domain) return null;

    const faviconSources = [
      `https://api.faviconkit.com/${domain}/128`, // Favicon Kit
      `https://icon.horse/icon/${domain}`, // Icon Horse - Alta calidad
      `https://www.google.com/s2/favicons?domain=${domain}&sz=128`, // Google Favicons
      `https://icons.duckduckgo.com/ip3/${domain}.ico`, // DuckDuckGo
      `https://${domain}/favicon.ico`, // Favicon directo del sitio
      `https://favicon.api.maplogs.com/v1/${domain}`, // Maplogs
    ];

    // Intenta cada fuente hasta encontrar una que funcione
    for (const source of faviconSources) {
      const exists = await checkImageExists(source);
      if (exists) {
        return source;
      }
    }

    return null;
  }

  onMount(async () => {
    backgroundImage = await getFaviconUrl(url);
  });
</script>

<a 
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="group block h-full"
  transition:fade
>
  <article class="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 p-6 group-hover:border-blue-500 dark:group-hover:border-blue-400">
    {#if backgroundImage}
      <div 
        class="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
        style="
          background-image: url('{backgroundImage}'); 
          background-position: center;
          background-size: 128px;
          background-repeat: no-repeat;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          filter: contrast(1.2) brightness(1.1);
        "
      />
    {/if}
    
    <!-- Contenido -->
    <div class="relative flex flex-col h-full z-10">
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
    <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
      <svg class="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </div>
  </article>
</a>