<script lang="ts">
    import SearchBar from './SearchBar.svelte';
    import TagFilter from './TagFilter.svelte';
  
    export let className = '';
  </script>
  
  <aside class={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
    <div class="p-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Filtros</h2>
      
      <!-- Search Bar -->
      <div class="mb-6">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Buscar</h3>
        <SearchBar />
      </div>
      
      <!-- Tag Filter with custom scrollbar -->
      <div class="overflow-y-auto max-h-[calc(100vh-20rem)] custom-scrollbar">
        <TagFilter />
      </div>
    </div>
  </aside>