<script lang="ts">
  import { resourceStore } from '../stores/resourceStore';
  
  let searchTerm = '';
  
  function handleSearch() {
    resourceStore.filterBySearch(searchTerm);
  }
</script>

<div class="relative">
  <input
    type="text"
    bind:value={searchTerm}
    on:input={handleSearch}
    placeholder="Buscar recursos..."
    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
  />
  <svg
    class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
</div>