export interface Tag {
  id: number;
  nombre: string;
}

export interface Resource {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
  imageUrl?: string;
  tags: Tag[];
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface ResourceCreateDTO {
  titulo: string;
  descripcion: string;
  url: string;
  tags: number[]; // IDs de los tags
}

export interface ApiError {
  message: string;
  status?: number;
}