import axios from 'axios';

const API_BASE_URL = 'https://repo-tech.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface Resource {
  id: string;
  titulo: string;
  descripcion: string;
  url: string;
  tags: string[];
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export async function getResources(): Promise<Resource[]> {
  try {
    const response = await api.get('/recursos/');
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Error al cargar los recursos');
  }
}

export async function getResourceById(id: string): Promise<Resource> {
  try {
    const response = await api.get(`/recursos/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Error al cargar el recurso');
  }
}

export async function getTags(): Promise<string[]> {
  try {
    const response = await api.get('/tags/');
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'Error al cargar los tags');
  }
}

export async function createResource(data: Omit<Resource, 'id' | 'fecha_creacion' | 'fecha_actualizacion'>): Promise<Resource> {
  try {
    const response = await api.post('/recursos/', data);
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