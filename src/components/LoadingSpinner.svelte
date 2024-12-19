<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
</script>

<div class="flex justify-center items-center">
  <div class={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}></div>
</div>