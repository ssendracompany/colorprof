# URLs de Imágenes Originales - Profesionales del Color

Este documento contiene todas las URLs de las imágenes de la web original de WordPress que se pueden descargar para la nueva galería.

## Imágenes de Exterior (~13 imágenes)

### URLs Base para Descargar:
1. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/1-1-scaled.jpg
2. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/2-1-scaled.jpg
3. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/4-1-scaled.jpg
4. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/decapado_finca.jpg
5. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Fachada.jpeg
6. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Routlos_Previo-Lijado_y-esmaltado_chapa.jpg
7. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Tratamiento-de-Madera-1.jpg
8. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/tratamiento-pistas.jpeg
9. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Decapado-chorro-de-arena_1.jpeg
10. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Pintura_esmaltado_interior_cesped.jpg
11. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/04/industrial.jpeg
12. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/04/industrial_1.jpeg
13. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/04/industrial_2.jpeg

**Descripción**: Fachadas, monocapas, caravista, tratamiento de madera, decapado, esmaltado

## Imágenes de Interior (~17 imágenes)

### URLs Base para Descargar:
1. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/1-2-scaled.jpg
2. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/2-2-scaled.jpg
3. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/3-2-scaled.jpg
4. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/4-2-scaled.jpg
5. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/5-scaled.jpg
6. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/6-scaled.jpg
7. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/IMG_20190412_170821-scaled.jpg
8. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/IMG_20190816_160831-scaled.jpg
9. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/IMG_20190816_181447-1-scaled.jpg
10. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/IMG_20190816_181455-scaled.jpg
11. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Interior_6.jpeg
12. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Interior_5.jpeg
13. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Interior_4.jpeg
14. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/interior-1.jpg
15. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/04/Comedor.jpeg
16. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/04/Comedor_2.jpeg
17. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/04/escalera.jpeg

**Descripción**: Papel pintado, paredes lisas, comedores, escaleras, salones

## Imágenes de Industrial (~8 imágenes)

### URLs Base para Descargar:
1. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/2-3-scaled.jpg
2. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/IMG_20190308_132750-scaled.jpg
3. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/IMG_20190308_134104-scaled.jpg
4. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Routlos_Previo-Lijado_y-esmaltado_chapa.jpg
5. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Decapado-chorro-de-arena_1.jpeg
6. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Marquesina.jpeg
7. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Limpieza-fachada_2.jpeg
8. https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Limpieza-fachada.jpeg

**Descripción**: Impermeabilización, limpieza de fachadas, marquesinas, estructuras metálicas

## Otras Imágenes de Contexto

### Imágenes de Inicio/Hero:
- https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Inicio_Interior.jpg
- https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/PotoFino.jpg
- https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Inicio_Industrial.jpg
- https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Gandia_1.jpg

### Imágenes en Secciones:
- https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/interior.jpg
- https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Exterior.jpg
- https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/Fabrica.jpg

## Proceso de Descarga Recomendado

### Opción 1: Descarga Manual
1. Copiar cada URL en el navegador
2. Click derecho → "Guardar imagen como..."
3. Guardar en la carpeta correspondiente (exterior/interior/industrial)
4. Renombrar con nombres descriptivos

### Opción 2: Descarga con Script (Bash)
```bash
# Descargar todas las imágenes de exterior
cd /Users/aitorevi/Dev/color/public/gallery/exterior
curl -O https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/1-1-scaled.jpg
curl -O https://www.profesionalesdelcolor.com/wp-content/uploads/2021/02/2-1-scaled.jpg
# ... (repetir para cada imagen)
```

### Opción 3: Herramienta de Descarga Masiva
Usar herramientas como:
- `wget` con lista de URLs
- `curl` con script bash
- Extensiones de navegador como "Download All Images"

## Checklist de Descarga

- [ ] Descargar 13 imágenes de Exterior
- [ ] Descargar 17 imágenes de Interior
- [ ] Descargar 8 imágenes de Industrial
- [ ] Descargar 7 imágenes de contexto (opcional)
- [ ] Optimizar todas las imágenes (TinyPNG, Squoosh)
- [ ] Renombrar con nombres descriptivos
- [ ] Organizar en carpetas correspondientes
- [ ] Actualizar Gallery.astro con las rutas

## Notas

- Total de imágenes: ~38 imágenes principales + 7 de contexto
- Las URLs con `-scaled.jpg` son imágenes de alta resolución (pueden ser grandes)
- Considerar convertir a WebP para mejor rendimiento
- Priorizar imágenes que mejor representen cada categoría de servicio

**Última actualización**: Noviembre 2024
