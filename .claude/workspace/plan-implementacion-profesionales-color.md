# Plan de Implementación - Profesionales del Color
## Migración WordPress → Astro + CSS Puro + Vercel

---

## 📋 Resumen Ejecutivo

**Proyecto:** Modernización del sitio web profesionalesdelcolor.com  
**Stack Tecnológico:** Astro + CSS Puro (Mobile First) + Vercel  
**Metodología CSS:** Variables CSS + Media Queries `min-width`  
**Tema:** Dark Mode Moderno  
**Duración Estimada:** 3-4 días de desarrollo  

---

## 🎯 Objetivos del Proyecto

1. Migrar de WordPress a una solución estática de alto rendimiento
2. Implementar un diseño moderno Dark Mode con CSS puro
3. Optimizar para SEO y Core Web Vitals
4. Mantener la funcionalidad del formulario de contacto
5. Asegurar responsive design con metodología Mobile First

---

## 🏗️ Arquitectura del Proyecto

```
profesionales-del-color/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Gallery.astro
│   │   ├── Services.astro
│   │   ├── FAQ.astro
│   │   ├── ContactForm.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── components/
│   │       ├── header.css
│   │       ├── hero.css
│   │       ├── gallery.css
│   │       ├── services.css
│   │       ├── faq.css
│   │       ├── contact.css
│   │       └── footer.css
│   └── assets/
│       └── images/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── astro.config.mjs
├── package.json
└── vercel.json
```

---

## 📝 Plan de Implementación por Fases

### **FASE 1: Configuración Inicial y Estructura Base**

#### Tarea 1.1: Inicialización del Proyecto Astro
**[Agente: Haiku]**
- Crear proyecto con `npm create astro@latest`
- Configurar TypeScript (opcional pero recomendado)
- Instalar dependencias necesarias
- Configurar `.gitignore`

#### Tarea 1.2: Configuración de Variables CSS y Sistema de Diseño
**[Agente: Haiku]**
- Crear archivo `variables.css` con:
  ```css
  :root {
    --color-background: #121212;
    --color-background-secondary: #1E1E1E;
    --color-text: #EAEAEA;
    --color-text-secondary: #B0B0B0;
    --color-accent: #FF7A00;
    --color-accent-hover: #FF9A40;
    --color-success: #4CAF50;
    --color-error: #F44336;
    
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-size-base: 16px;
    --font-size-h1: clamp(2rem, 5vw, 3rem);
    --font-size-h2: clamp(1.5rem, 4vw, 2.25rem);
    
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 3rem;
    --spacing-xl: 4rem;
    
    --border-radius: 8px;
    --transition-fast: 200ms ease;
  }
  ```

#### Tarea 1.3: Configuración de CSS Global y Reset
**[Agente: Haiku]**
- Crear `global.css` con reset CSS moderno
- Implementar estilos base Mobile First
- Configurar tipografía (importar Inter desde Google Fonts)
- Establecer breakpoints con `min-width`:
  ```css
  /* Mobile First - Base styles for mobile */
  /* Tablet: @media (min-width: 768px) */
  /* Desktop: @media (min-width: 1024px) */
  /* Large Desktop: @media (min-width: 1440px) */
  ```

#### Tarea 1.4: Crear Layout Principal
**[Agente: Haiku]**
- Desarrollar `Layout.astro` con estructura HTML5 semántica
- Implementar meta tags SEO básicos
- Incluir Open Graph tags
- Configurar viewport para responsive

#### Tarea 1.5: Configuración de Vercel
**[Agente: Opus/Sonnet]**
- Crear `vercel.json` con configuración de build
- Instalar `@astrojs/vercel` adapter
- Configurar `astro.config.mjs` para output estático
- Establecer headers de seguridad

---

### **FASE 2: Componentes de Navegación y Estructura**

#### Tarea 2.1: Componente Header
**[Agente: Haiku]**
- Crear `Header.astro` con logo y navegación
- Implementar CSS Mobile First en `header.css`:
  - Mobile: Menú hamburguesa
  - Desktop (`min-width: 1024px`): Navegación horizontal
- Añadir efecto sticky con backdrop-filter

#### Tarea 2.2: Componente Footer
**[Agente: Haiku]**
- Crear `Footer.astro` con información de contacto
- Implementar CSS responsive en `footer.css`
- Incluir teléfono: (+34) 638 94 39 62
- Añadir enlaces a redes sociales (si aplica)

---

### **FASE 3: Secciones de Contenido Principal**

#### Tarea 3.1: Componente Hero
**[Agente: Haiku]**
- Crear `Hero.astro` con título principal y CTA
- Implementar CSS en `hero.css`:
  - Mobile: Diseño vertical centrado
  - Desktop (`min-width: 1024px`): Layout con imagen de fondo
- Animaciones sutiles con CSS (fade-in)

#### Tarea 3.2: Componente Services
**[Agente: Haiku]**
- Crear `Services.astro` con grid de servicios
- Implementar CSS en `services.css`:
  - Mobile: Cards apiladas
  - Tablet (`min-width: 768px`): Grid 2 columnas
  - Desktop (`min-width: 1024px`): Grid 3 columnas
- Incluir servicios principales del pintor

#### Tarea 3.3: Componente Gallery (Carrusel)
**[Agente: Opus/Sonnet]**
- Crear `Gallery.astro` con sistema de carrusel
- Implementar lógica de carrusel con Astro Islands (JavaScript mínimo)
- CSS en `gallery.css`:
  - Mobile: Swipe gestures
  - Desktop: Botones de navegación
- Lazy loading de imágenes

#### Tarea 3.4: Componente FAQ
**[Agente: Haiku]**
- Crear `FAQ.astro` con acordeón de preguntas
- Migrar contenido de preguntas frecuentes actual
- Implementar CSS en `faq.css`:
  - Mobile: Acordeón compacto
  - Desktop (`min-width: 768px`): Más espaciado
- Animaciones de expand/collapse con CSS

---

### **FASE 4: Formulario de Contacto y Funcionalidad**

#### Tarea 4.1: Componente ContactForm
**[Agente: Opus/Sonnet]**
- Crear `ContactForm.astro` con campos:
  - Nombre (required)
  - Email (required, type="email")
  - Teléfono (type="tel")
  - Tipo de Servicio (select)
  - Mensaje (textarea)
- Añadir atributo `data-vercel-analytics="true"`
- Implementar validación HTML5

#### Tarea 4.2: Estilizado del Formulario
**[Agente: Haiku]**
- Crear CSS en `contact.css`:
  - Mobile: Campos apilados 100% ancho
  - Desktop (`min-width: 768px`): Layout en 2 columnas
- Estados hover/focus con color accent
- Mensajes de error/éxito estilizados

#### Tarea 4.3: Configuración de Vercel Forms
**[Agente: Opus/Sonnet]**
- Configurar endpoint de formulario en Vercel
- Implementar respuesta de confirmación
- Configurar notificaciones por email
- Testing de funcionalidad

---

### **FASE 5: Optimización y Performance**

#### Tarea 5.1: Optimización de Imágenes
**[Agente: Haiku]**
- Implementar componente Image de Astro
- Configurar formatos modernos (WebP, AVIF)
- Establecer lazy loading
- Optimizar tamaños para diferentes viewports

#### Tarea 5.2: Optimización de CSS
**[Agente: Haiku]**
- Revisar y eliminar CSS no utilizado
- Minificar archivos CSS
- Implementar Critical CSS
- Verificar especificidad y cascada

#### Tarea 5.3: SEO y Metadatos
**[Agente: Opus/Sonnet]**
- Implementar schema.org para negocio local
- Crear sitemap.xml
- Configurar robots.txt
- Añadir meta descriptions optimizadas

#### Tarea 5.4: Accesibilidad
**[Agente: Haiku]**
- Auditoría WCAG 2.1 nivel AA
- Implementar ARIA labels donde sea necesario
- Verificar contraste de colores
- Asegurar navegación por teclado

---

### **FASE 6: Testing y Despliegue**

#### Tarea 6.1: Testing Cross-browser
**[Agente: Haiku]**
- Verificar en Chrome, Firefox, Safari, Edge
- Testing en dispositivos móviles reales
- Validar formulario en diferentes navegadores

#### Tarea 6.2: Performance Testing
**[Agente: Opus/Sonnet]**
- Ejecutar Lighthouse audit
- Objetivo: 95+ en todas las métricas
- Optimizar Core Web Vitals
- Verificar tiempo de carga < 2s

#### Tarea 6.3: Configuración de Dominio
**[Agente: Opus/Sonnet]**
- Configurar DNS para apuntar a Vercel
- Implementar SSL/HTTPS
- Configurar redirects desde www
- Establecer headers de seguridad

#### Tarea 6.4: Despliegue Final
**[Agente: Opus/Sonnet]**
- Deploy a Vercel production
- Verificar formulario en producción
- Configurar analytics (opcional)
- Documentar proceso de mantenimiento

---

## 📊 Métricas de Éxito

- **Performance Score:** > 95/100 (Lighthouse)
- **Accesibilidad:** > 95/100 (Lighthouse)
- **SEO:** > 95/100 (Lighthouse)
- **Tiempo de carga:** < 2 segundos
- **Mobile-friendly:** 100% responsive
- **Formulario:** 100% funcional

---

## 🚀 Checklist Pre-lanzamiento

- [ ] Todos los componentes responsive (Mobile First)
- [ ] Variables CSS implementadas correctamente
- [ ] Formulario funcional con Vercel
- [ ] Imágenes optimizadas
- [ ] SEO configurado
- [ ] SSL activo
- [ ] Backup del sitio WordPress
- [ ] Redirects configurados
- [ ] Analytics instalado
- [ ] Testing completo realizado

---

## 📝 Notas Importantes

1. **CSS Mobile First:** Todos los estilos base son para móvil, usando `min-width` para breakpoints superiores
2. **Variables CSS:** Centralizar todos los colores y espaciados en variables
3. **Sin frameworks CSS:** Todo el estilizado es CSS puro
4. **Vercel Forms:** El formulario usa la integración nativa de Vercel
5. **Dark Mode:** El tema oscuro es el único tema (no hay light mode)

---

## 🔧 Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Deploy a Vercel
vercel --prod
```

---

## 📚 Recursos y Referencias

- [Documentación Astro](https://docs.astro.build)
- [Vercel Forms Documentation](https://vercel.com/docs/concepts/forms)
- [CSS Variables MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Mobile First Design Pattern](https://www.lukew.com/ff/entry.asp?933)

---

**Última actualización:** Noviembre 2024  
**Versión del plan:** 1.0.0
