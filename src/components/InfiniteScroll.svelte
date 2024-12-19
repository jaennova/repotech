<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  const dispatch = createEventDispatcher();
  let container: HTMLElement;
  let scrollHandler: () => void;
  
  function handleScroll() {
    if (!browser) return;
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      dispatch('loadMore');
    }
  }
  
  onMount(() => {
    if (browser) {
      scrollHandler = handleScroll;
      window.addEventListener('scroll', scrollHandler);
    }
  });
  
  onDestroy(() => {
    if (browser && scrollHandler) {
      window.removeEventListener('scroll', scrollHandler);
    }
  });
</script>

<div bind:this={container}>
  <slot />
</div>