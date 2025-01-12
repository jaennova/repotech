<script lang="ts">
  import type { Tag } from "../types/api.types";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  export const id: number = 0;
  export let title: string;
  export let description: string;
  export let tags: Tag[];
  export let url: string;

  let favicon: string | null = null;

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

    // Usar solo Google Favicons que proporciona íconos de mejor calidad en tamaño pequeño
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  }

  onMount(async () => {
    favicon = await getFaviconUrl(url);
  });
</script>

<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="group block h-full"
  transition:fade
>
  <article
    class="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 p-6 group-hover:border-blue-500 dark:group-hover:border-blue-400"
  >
    <div class="flex flex-col h-full">
      <!-- Header con título e ícono -->
      <div class="flex items-center gap-3 mb-3">
        {#if favicon}
          <img
            src={favicon}
            alt="Site icon"
            class="w-6 h-6 rounded-full"
            style="image-rendering: -webkit-optimize-contrast;"
          />
        {/if}
        <h2
          class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1"
        >
          {title}
        </h2>

        <!-- Icono de enlace -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            class="w-5 h-5 text-blue-500 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>

      <!-- Descripción -->
      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {description}
      </p>

      <!-- URL en texto pequeño -->
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {getDomain(url)}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mt-auto">
        {#each tags as tag (tag.id)}
          <span
            class="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
          >
            <span class="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
            ></span>
            {tag.nombre}
          </span>
        {/each}
      </div>
    </div>
  </article>
</a>
