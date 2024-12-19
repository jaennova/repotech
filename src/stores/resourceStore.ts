import { writable } from 'svelte/store';
import type { Resource, Tag } from '../types/api.types';

export interface ResourceState {
  resources: Resource[];
  filteredResources: Resource[];
  loading: boolean;
  error: string | null;
}

const initialState: ResourceState = {
  resources: [],
  filteredResources: [],
  loading: false,
  error: null
};

function createResourceStore() {
  const { subscribe, set, update } = writable<ResourceState>(initialState);

  return {
    subscribe,
    setResources: (resources: Resource[]) => {
      update(state => ({
        ...state,
        resources,
        filteredResources: resources
      }));
    },
    setError: (error: string) => {
      update(state => ({ ...state, error }));
    },
    setLoading: (loading: boolean) => {
      update(state => ({ ...state, loading }));
    },
    filterBySearch: (searchTerm: string) => {
      update(state => ({
        ...state,
        filteredResources: state.resources.filter(resource =>
          resource.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }));
    },
    filterByTags: (selectedTags: number[]) => {
      update(state => ({
        ...state,
        filteredResources: selectedTags.length === 0
          ? state.resources
          : state.resources.filter(resource =>
              resource.tags.some(tag => selectedTags.includes(tag.id))
            )
      }));
    },
    reset: () => set(initialState)
  };
}

export const resourceStore = createResourceStore();