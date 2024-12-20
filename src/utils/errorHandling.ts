export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Error en la conexión con el servidor';
    
    if (status === 404) {
      throw new ApiError('Recurso no encontrado', status);
    }
    
    if (status === 408 || error.code === 'ECONNABORTED') {
      throw new ApiError('Tiempo de espera agotado. Por favor, intenta nuevamente.', status);
    }
    
    throw new ApiError(message, status);
  }
  
  throw new ApiError('Error inesperado. Por favor, intenta nuevamente.');
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}