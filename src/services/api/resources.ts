import { apiClient } from './client';
import { handleApiError } from '../../utils/errorHandling';
import type { Resource } from '../../types/api.types';
import { API_CONFIG } from './config';

export async function getResources(): Promise<Resource[]> {
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.RESOURCES, {
      params: {
        orden_por: 'tags',
        direccion: 'asc'
      }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getTags() {
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.TAGS);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}