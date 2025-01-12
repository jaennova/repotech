<script lang="ts">
    import { onMount } from "svelte";
    import { getTags } from "../services/api/resources";
    import type { Tag } from "../types/api.types";
    import LoadingSpinner from "./LoadingSpinner.svelte";

    export let selectedTags: Set<number> = new Set();

    let tags: Tag[] = [];
    let loading = true;
    let error: string | null = null;

    onMount(async () => {
        try {
            tags = await getTags();
        } catch (e) {
            error = e instanceof Error ? e.message : "Error al cargar los tags";
        } finally {
            loading = false;
        }
    });

    function toggleTag(tag: Tag) {
        if (selectedTags.has(tag.id)) {
            selectedTags.delete(tag.id);
        } else {
            selectedTags.add(tag.id);
        }
        selectedTags = selectedTags;
        // Disparar un evento personalizado con los tags seleccionados
        dispatchEvent(
            new CustomEvent("tagsChange", {
                detail: Array.from(selectedTags),
            }),
        );
    }
</script>

<div class="space-y-4">
    {#if loading}
        <LoadingSpinner size="sm" />
    {:else if error}
        <div class="text-red-600 dark:text-red-400">
            <p>{error}</p>
        </div>
    {:else}
        <div class="flex flex-wrap gap-2">
            {#each tags as tag (tag.id)}
                <button
                    type="button"
                    class={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${
                  selectedTags.has(tag.id)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
                    on:click={() => toggleTag(tag)}
                >
                    {tag.nombre}
                </button>
            {/each}
        </div>
    {/if}
</div>
