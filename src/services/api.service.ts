import axios from 'axios';
import type { Resource, Tag, ResourceCreateDTO, ApiError } from '../types/api.types';
import { API_CONFIG } from '../config/api.config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
});

export async function getResources(): Promise<Resource[]> {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.RESOURCES);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Error al cargar los recursos');
  }
}

export async function getResourceById(id: number): Promise<Resource> {
  try {
    const response = await api.get(`${API_CONFIG.ENDPOINTS.RESOURCES}/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Error al cargar el recurso');
  }
}

export async function getTags(): Promise<Tag[]> {
  try {
    const response = await api.get(API_CONFIG.ENDPOINTS.TAGS);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Error al cargar los tags');
  }
}

export async function createResource(data: ResourceCreateDTO): Promise<Resource> {
  try {
    const response = await api.post(API_CONFIG.ENDPOINTS.RESOURCES, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Error al crear el recurso');
  }
}

function handleApiError(error: any, defaultMessage: string): ApiError {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || defaultMessage,
      status: error.response?.status
    };
  }
  return { message: defaultMessage };
}