# RepoTech - Recursos para Desarrolladores

RepoTech es una aplicación web construida con Astro que proporciona una colección curada de recursos tecnológicos para desarrolladores.

## 🚀 Características

- 🔍 Búsqueda de recursos
- 🏷️ Filtrado por tags
- 📱 Diseño responsive
- ⚡ Carga rápida y eficiente
- 🌙 Soporte para modo oscuro

## 🛠️ Tecnologías

- [Astro](https://astro.build/)
- [Svelte](https://svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## API Backend

Este proyecto utiliza la API de Recursos Tecnológicos desarrollada en [jaennova/repotech-api](https://github.com/jaennova/repotech-api) para la gestión de recursos y etiquetas.

### Características Principales
- API REST construida con FastAPI
- Gestión de recursos tecnológicos y tags asociados
- Soporte para búsqueda y filtrado
- Paginación de resultados
- CORS habilitado específicamente para este frontend

### Endpoints Relevantes

#### Recursos
- `GET /recursos/`: Lista de recursos (paginada)
- `POST /recursos/`: Crear nuevo recurso
- `GET /recursos/buscar/`: Búsqueda con filtros
  - Parámetros: `q` (búsqueda), `tag`, `skip`, `limit`
- `DELETE /recursos/{id}`: Eliminar recurso

#### Tags
- `GET /tags/`: Lista de tags disponibles
- `DELETE /tags/{id}`: Eliminar tag

### Formato de Datos

```json
// Crear Recurso
{
  "titulo": "string",
  "descripcion": "string",
  "url": "string",
  "tags": ["string"]
}

// Respuesta Recurso
{
  "id": "integer",
  "titulo": "string",
  "descripcion": "string",
  "url": "string",
  "fecha_creacion": "datetime",
  "fecha_actualizacion": "datetime",
  "tags": [
    {
      "id": "integer",
      "nombre": "string"
    }
  ]
}
```

### Documentación
Para más detalles sobre los endpoints y modelos de datos, consultar:
- Swagger UI: `{API_URL}/docs`
- ReDoc: `{API_URL}/redoc`

### Notas de Integración
- La API tiene CORS configurado para aceptar peticiones desde `repotech.vercel.app` y `localhost:4321`
- Soporta paginación en las consultas de recursos
- Incluye validación de datos y manejo de errores

## 📁 Estructura del Proyecto

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ResourceList.svelte
│   │   ├── SearchBar.svelte
│   │   └── TagFilter.svelte
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── services/
│   │   └── api.service.ts
│   └── utils/
│       └── validation.ts
└── package.json
```

## 🚀 Comenzando

1. Clona el repositorio:
```bash
git clone https://github.com/jaennova/repotech.git
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 📝 Comandos Disponibles

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia servidor local en `localhost:4321`        |
| `npm run build`           | Construye el sitio para producción en `./dist/`  |
| `npm run preview`         | Previsualiza la build localmente                 |
| `npm run astro ...`       | Ejecuta comandos de CLI como `astro add`         |

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Hacer fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit a tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 📞 Contacto

Jaen Nova - [@jaennova](https://github.com/jaennova)

Link del proyecto: [https://github.com/jaennova/repotech](https://github.com/jaennova/repotech)

---

⭐️ Si este proyecto te ha sido útil, considera darle una estrella en GitHub!
