export function serializeError(error: any): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error !== null) {
    try {
      return JSON.stringify(error);
    } catch (e) {
      return 'Error no serializable';
    }
  }
  return 'Error desconocido';
}

export function handleClientError(error: any): void {
  const errorMessage = serializeError(error);
  console.error('Error en el cliente:', errorMessage);
  // Aquí podrías integrar un servicio de monitoreo de errores como Sentry
}