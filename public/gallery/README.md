# Galería de Imágenes - Colorprof

## Estructura de Carpetas

```
/public/gallery/
├── exterior/     # Imágenes de trabajos exteriores (fachadas, monocapas, etc.)
├── interior/     # Imágenes de trabajos interiores (paredes, papel pintado, etc.)
└── industrial/   # Imágenes de trabajos industriales (estructuras metálicas, suelos, etc.)
```

## Instrucciones para Agregar Imágenes

### 1. Especificaciones de Imagen

**Formato recomendado**: WebP (mejor rendimiento) o JPG
**Dimensiones recomendadas**: 800px - 1200px de ancho
**Peso máximo**: 500KB por imagen (comprimidas)
**Aspecto ratio**: Preferiblemente 4:3 o 16:9

### 2. Nomenclatura de Archivos

Usar nombres descriptivos en minúsculas y guiones:
- ✅ `fachada-monocapa-gandia.jpg`
- ✅ `interior-papel-pintado-salon.webp`
- ✅ `industrial-estructura-metalica.jpg`
- ❌ `IMG_1234.jpg`
- ❌ `Foto Final.JPG`

### 3. Optimización

Antes de subir las imágenes, optimízalas usando herramientas como:
- [TinyPNG](https://tinypng.com/) - Compresión JPG/PNG
- [Squoosh](https://squoosh.app/) - Conversión a WebP
- [ImageOptim](https://imageoptim.com/) - Optimización local (Mac)

### 4. Actualizar el Componente Gallery

Después de agregar las imágenes, actualiza el archivo `/src/components/Gallery.astro`:

```astro
const images = [
  { src: '/gallery/exterior/fachada-1.jpg', alt: 'Fachada monocapa en Gandía', category: 'exterior' },
  { src: '/gallery/interior/salon-1.jpg', alt: 'Salón con papel pintado', category: 'interior' },
  { src: '/gallery/industrial/estructura-1.jpg', alt: 'Estructura metálica protegida', category: 'industrial' },
  // ... más imágenes
];
```

### 5. Cantidad Recomendada

- **Exterior**: 10-15 imágenes representativas
- **Interior**: 10-15 imágenes representativas
- **Industrial**: 8-10 imágenes representativas

## URLs de Imágenes Originales

Ver archivo `IMAGE_SOURCES.md` para la lista completa de URLs de imágenes de la web original que se pueden descargar.

## Checklist

- [ ] Descargar imágenes de la web original (ver IMAGE_SOURCES.md)
- [ ] Optimizar todas las imágenes (comprimir, convertir a WebP)
- [ ] Renombrar con nombres descriptivos
- [ ] Subir a carpetas correspondientes (exterior/interior/industrial)
- [ ] Actualizar componente Gallery.astro con rutas
- [ ] Verificar que todas las imágenes cargan correctamente
- [ ] Probar el carousel en diferentes dispositivos

## Soporte

Para cualquier duda sobre la galería, contacta al equipo de desarrollo.
