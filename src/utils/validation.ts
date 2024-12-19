import type { ResourceCreateDTO } from '../types/api.types';

export function validateResourceCreate(data: Partial<ResourceCreateDTO>): string[] {
  const errors: string[] = [];
  
  if (!data.titulo?.trim()) {
    errors.push('El título es obligatorio');
  }
  
  if (!data.descripcion?.trim()) {
    errors.push('La descripción es obligatoria');
  }
  
  if (!data.url?.trim()) {
    errors.push('La URL es obligatoria');
  } else if (!isValidUrl(data.url)) {
    errors.push('La URL no es válida');
  }
  
  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push('Debe incluir al menos un tag');
  }
  
  return errors;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}