# Frontend Implementation Checklist - Painter's Website (Astro Migration)

**Project**: Professional Painter Website Migration (WordPress → Astro)
**Framework**: Astro + TypeScript
**Styling**: Pure CSS with CSS Variables (Dark Mode)
**Approach**: Mobile-First Responsive Design
**Accent Color**: #FF7A00 (Orange)

---

## Section 1: Project Setup & Initialization

### 1.1 Initial Setup
- [ ] Initialize Astro project with npm create astro@latest
  - **Path**: Root directory
  - **Acceptance Criteria**:
    - Project created with TypeScript template
    - Git repository initialized
    - .gitignore includes node_modules, dist, .env
  - **Test**: Run `npm run dev` and verify server starts on localhost:4321

- [ ] Configure TypeScript strict mode
  - **Path**: `tsconfig.json`
  - **Acceptance Criteria**:
    ```json
    {
      "extends": "astro/tsconfigs/strict",
      "compilerOptions": {
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true
      }
    }
    ```
  - **Test**: Run `npm run build` and verify no TypeScript errors

- [ ] Install required dependencies
  - **Command**:
    ```bash
    npm install @astrojs/vercel @astrojs/image sharp
    npm install -D vitest @vitest/ui @playwright/test axe-core @axe-core/playwright
    ```
  - **Acceptance Criteria**: All packages installed without peer dependency warnings
  - **Test**: Check `package.json` for all dependencies listed

- [ ] Create directory structure
  - **Paths to create**:
    ```
    src/
    ├── components/
    ├── layouts/
    ├── pages/
    ├── styles/
    │   ├── components/
    │   └── utils/
    ├── assets/
    │   └── images/
    └── types/
    ```
  - **Acceptance Criteria**: All directories exist
  - **Test**: Run `ls -R src/` to verify structure

### 1.2 Configuration Files

- [ ] Configure astro.config.mjs for optimization
  - **Path**: `astro.config.mjs`
  - **Acceptance Criteria**:
    ```javascript
    import { defineConfig } from 'astro/config';
    import vercel from '@astrojs/vercel/serverless';

    export default defineConfig({
      output: 'server',
      adapter: vercel(),
      compressHTML: true,
      build: {
        inlineStylesheets: 'auto'
      },
      image: {
        service: {
          entrypoint: 'astro/assets/services/sharp'
        }
      }
    });
    ```
  - **Test**: Build project and verify configuration loads without errors

- [ ] Set up environment variables
  - **Path**: `.env` and `.env.example`
  - **Acceptance Criteria**:
    - `.env.example` committed with placeholder values
    - `.env` added to .gitignore
    - Variables include: SITE_URL, CONTACT_EMAIL, PHONE_NUMBER
  - **Test**: Access `import.meta.env.SITE_URL` in a component without errors

---

## Section 2: CSS System (Base Layer)

### 2.1 Design Tokens

- [ ] Create CSS Variables system
  - **Path**: `src/styles/variables.css`
  - **Acceptance Criteria**:
    ```css
    :root {
      /* Colors - Dark Mode */
      --color-bg-primary: #0a0a0a;
      --color-bg-secondary: #1a1a1a;
      --color-bg-tertiary: #2a2a2a;
      --color-text-primary: #f5f5f5;
      --color-text-secondary: #b0b0b0;
      --color-text-tertiary: #808080;
      --color-accent: #FF7A00;
      --color-accent-hover: #ff8c1a;
      --color-success: #22c55e;
      --color-error: #ef4444;
      --color-border: #333333;

      /* Spacing Scale */
      --space-xs: 0.5rem;    /* 8px */
      --space-sm: 1rem;      /* 16px */
      --space-md: 1.5rem;    /* 24px */
      --space-lg: 2rem;      /* 32px */
      --space-xl: 3rem;      /* 48px */
      --space-2xl: 4rem;     /* 64px */
      --space-3xl: 6rem;     /* 96px */

      /* Typography - Fluid Scaling */
      --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      --font-family-heading: var(--font-family-base);

      --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
      --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
      --font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
      --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
      --font-size-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
      --font-size-2xl: clamp(2rem, 1.6rem + 2vw, 3rem);
      --font-size-3xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);

      --font-weight-normal: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;

      --line-height-tight: 1.2;
      --line-height-normal: 1.5;
      --line-height-relaxed: 1.75;

      /* Transitions */
      --transition-fast: 150ms ease-in-out;
      --transition-normal: 250ms ease-in-out;
      --transition-slow: 350ms ease-in-out;

      /* Border Radius */
      --radius-sm: 0.25rem;
      --radius-md: 0.5rem;
      --radius-lg: 1rem;
      --radius-full: 9999px;

      /* Shadows */
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);
      --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.6);

      /* Z-Index Scale */
      --z-dropdown: 1000;
      --z-sticky: 1100;
      --z-fixed: 1200;
      --z-modal-backdrop: 1300;
      --z-modal: 1400;
      --z-tooltip: 1500;
    }
    ```
  - **Test**: Import in a component and verify CSS variables accessible via dev tools

- [ ] Verify WCAG AA color contrast compliance
  - **Tool**: WebAIM Contrast Checker or Chrome DevTools
  - **Acceptance Criteria**:
    - Text on bg-primary: 4.5:1 minimum (normal text), 3:1 (large text)
    - Accent color on dark bg: 3:1 minimum
    - All interactive elements meet contrast requirements
  - **Test**: Run automated accessibility audit with axe-core

### 2.2 Global Styles

- [ ] Create modern CSS reset and base styles
  - **Path**: `src/styles/global.css`
  - **Acceptance Criteria**:
    ```css
    /* Modern CSS Reset */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    body {
      min-height: 100vh;
      font-family: var(--font-family-base);
      font-size: var(--font-size-base);
      line-height: var(--line-height-normal);
      color: var(--color-text-primary);
      background-color: var(--color-bg-primary);
    }

    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
      height: auto;
    }

    button, input, textarea, select {
      font: inherit;
      color: inherit;
    }

    button {
      cursor: pointer;
      border: none;
      background: none;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    ul, ol {
      list-style: none;
    }

    /* Focus Visible for Accessibility */
    :focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }

    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Breakpoints Reference (mobile-first with min-width)
       Mobile: base styles (320px+)
       Tablet: @media (min-width: 768px)
       Desktop: @media (min-width: 1024px)
       Large: @media (min-width: 1440px)
    */
    ```
  - **Test**: Apply to a page and verify reset works across browsers (Chrome, Firefox, Safari)

- [ ] Create responsive utility patterns
  - **Path**: `src/styles/utils/layout.css`
  - **Acceptance Criteria**:
    ```css
    /* Container */
    .container {
      width: 100%;
      max-width: 1440px;
      margin-inline: auto;
      padding-inline: var(--space-md);
    }

    @media (min-width: 768px) {
      .container {
        padding-inline: var(--space-lg);
      }
    }

    @media (min-width: 1024px) {
      .container {
        padding-inline: var(--space-xl);
      }
    }

    /* Flexbox Utilities */
    .flex {
      display: flex;
    }

    .flex-col {
      flex-direction: column;
    }

    .items-center {
      align-items: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .gap-sm { gap: var(--space-sm); }
    .gap-md { gap: var(--space-md); }
    .gap-lg { gap: var(--space-lg); }

    /* Visually Hidden (for screen readers) */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
    ```
  - **Test**: Use utilities in test component and verify responsive behavior

---

## Section 3: Layouts

### 3.1 Main Layout Template

- [ ] Create base Layout component
  - **Path**: `src/layouts/Layout.astro`
  - **Acceptance Criteria**:
    ```astro
    ---
    import '../styles/variables.css';
    import '../styles/global.css';
    import '../styles/utils/layout.css';

    interface Props {
      title: string;
      description: string;
      ogImage?: string;
    }

    const { title, description, ogImage = '/og-default.jpg' } = Astro.props;
    const canonicalURL = new URL(Astro.url.pathname, Astro.site);
    ---

    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="generator" content={Astro.generator} />

        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalURL} />

        <!-- Open Graph -->
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalURL} />
        <meta property="og:type" content="website" />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </head>
      <body>
        <slot />
      </body>
    </html>
    ```
  - **Test**: Render a page with this layout and verify meta tags in HTML source

- [ ] Create PageLayout component with Header/Footer
  - **Path**: `src/layouts/PageLayout.astro`
  - **Acceptance Criteria**:
    ```astro
    ---
    import Layout from './Layout.astro';
    import Header from '../components/Header.astro';
    import Footer from '../components/Footer.astro';

    interface Props {
      title: string;
      description: string;
      ogImage?: string;
    }

    const props = Astro.props;
    ---

    <Layout {...props}>
      <Header />
      <main id="main-content">
        <slot />
      </main>
      <Footer />
    </Layout>
    ```
  - **Test**: Create test page using PageLayout and verify header/footer render

- [ ] Verify meta tags render correctly
  - **Test Method**: View page source, check Open Graph validator
  - **Acceptance Criteria**:
    - All meta tags present in HTML
    - OG image URLs are absolute
    - Twitter card validator shows preview correctly
  - **Test**: Use https://www.opengraph.xyz/ to validate

---

## Section 4: Header Component

### 4.1 Header Structure

- [ ] Create Header component with semantic HTML
  - **Path**: `src/components/Header.astro`
  - **Acceptance Criteria**:
    ```astro
    ---
    import MobileMenuToggle from './MobileMenuToggle';
    import '../styles/components/header.css';

    const navLinks = [
      { href: '#servicios', label: 'Servicios' },
      { href: '#galeria', label: 'Galería' },
      { href: '#faq', label: 'Preguntas' },
      { href: '#contacto', label: 'Contacto' }
    ];
    ---

    <header class="header" id="header">
      <div class="header__container container">
        <a href="/" class="header__logo" aria-label="Inicio">
          <span class="header__logo-text">Pintor Profesional</span>
        </a>

        <nav class="header__nav" id="nav-menu" aria-label="Navegación principal">
          <ul class="header__nav-list">
            {navLinks.map((link) => (
              <li>
                <a href={link.href} class="header__nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenuToggle client:load />
      </div>
    </header>
    ```
  - **Test**: Render header and verify all links present

### 4.2 Header Styles (Mobile-First)

- [ ] Create header CSS with mobile-first responsive design
  - **Path**: `src/styles/components/header.css`
  - **Acceptance Criteria**:
    ```css
    /* Mobile Base Styles (320px+) */
    .header {
      position: sticky;
      top: 0;
      z-index: var(--z-sticky);
      background-color: rgba(10, 10, 10, 0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--color-border);
      transition: background-color var(--transition-normal);
    }

    .header__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 4rem;
    }

    .header__logo-text {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: var(--color-accent);
    }

    /* Mobile Navigation - Hidden by default, shown when menu active */
    .header__nav {
      position: fixed;
      top: 4rem;
      left: 0;
      width: 100%;
      background-color: var(--color-bg-secondary);
      transform: translateX(-100%);
      transition: transform var(--transition-normal);
      border-bottom: 1px solid var(--color-border);
    }

    .header__nav[data-visible="true"] {
      transform: translateX(0);
    }

    .header__nav-list {
      display: flex;
      flex-direction: column;
      padding: var(--space-md);
      gap: var(--space-sm);
    }

    .header__nav-link {
      display: block;
      padding: var(--space-sm);
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      transition: color var(--transition-fast);
      border-radius: var(--radius-md);
    }

    .header__nav-link:hover,
    .header__nav-link:focus-visible {
      color: var(--color-accent);
      background-color: var(--color-bg-tertiary);
    }

    /* Tablet and Desktop (768px+) */
    @media (min-width: 768px) {
      .header__nav {
        position: static;
        transform: translateX(0);
        background-color: transparent;
        border-bottom: none;
      }

      .header__nav-list {
        flex-direction: row;
        padding: 0;
        gap: var(--space-md);
      }

      .header__nav-link {
        padding: var(--space-xs) var(--space-sm);
      }
    }

    /* Desktop Large (1024px+) */
    @media (min-width: 1024px) {
      .header__container {
        min-height: 5rem;
      }

      .header__nav-list {
        gap: var(--space-lg);
      }
    }
    ```
  - **Test**: Resize browser from 320px to 1440px and verify layout changes at breakpoints

### 4.3 Mobile Menu Toggle Component

- [ ] Create interactive mobile menu toggle (Astro Island)
  - **Path**: `src/components/MobileMenuToggle.tsx`
  - **Acceptance Criteria**:
    ```tsx
    import { useState, useEffect } from 'react';
    import '../styles/components/mobile-menu.css';

    export default function MobileMenuToggle() {
      const [isOpen, setIsOpen] = useState(false);

      const toggleMenu = () => {
        setIsOpen(!isOpen);
        const nav = document.getElementById('nav-menu');
        if (nav) {
          nav.setAttribute('data-visible', (!isOpen).toString());
        }
      };

      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 768) {
            setIsOpen(false);
            const nav = document.getElementById('nav-menu');
            if (nav) nav.setAttribute('data-visible', 'false');
          }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      return (
        <button
          className="mobile-menu-toggle"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
        >
          <span className={`hamburger ${isOpen ? 'hamburger--active' : ''}`}>
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
            <span className="hamburger__line"></span>
          </span>
        </button>
      );
    }
    ```
  - **Test**: Click toggle on mobile and verify menu slides in/out

- [ ] Create mobile menu toggle styles
  - **Path**: `src/styles/components/mobile-menu.css`
  - **Acceptance Criteria**:
    ```css
    .mobile-menu-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      padding: var(--space-xs);
      z-index: var(--z-fixed);
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      width: 1.5rem;
    }

    .hamburger__line {
      width: 100%;
      height: 2px;
      background-color: var(--color-text-primary);
      transition: transform var(--transition-normal), opacity var(--transition-normal);
    }

    .hamburger--active .hamburger__line:nth-child(1) {
      transform: translateY(0.5rem) rotate(45deg);
    }

    .hamburger--active .hamburger__line:nth-child(2) {
      opacity: 0;
    }

    .hamburger--active .hamburger__line:nth-child(3) {
      transform: translateY(-0.5rem) rotate(-45deg);
    }

    /* Hide on tablet and above */
    @media (min-width: 768px) {
      .mobile-menu-toggle {
        display: none;
      }
    }
    ```
  - **Test**: Verify hamburger icon animates to X when clicked

### 4.4 Accessibility Testing

- [ ] Test header keyboard navigation and accessibility
  - **Test Method**: Manual keyboard testing + axe-core automated scan
  - **Acceptance Criteria**:
    - Tab navigates through all links
    - Enter/Space activates mobile menu toggle
    - Escape closes mobile menu
    - Focus visible on all interactive elements
    - ARIA labels correctly announced by screen reader
  - **Test**: Use NVDA/JAWS screen reader, run axe-core accessibility audit

---

## Section 5: Hero Component

### 5.1 Hero Structure

- [ ] Create Hero component with semantic markup
  - **Path**: `src/components/Hero.astro`
  - **Acceptance Criteria**:
    ```astro
    ---
    import { Image } from 'astro:assets';
    import heroImage from '../assets/images/hero-background.jpg';
    import '../styles/components/hero.css';
    ---

    <section class="hero" aria-labelledby="hero-heading">
      <div class="hero__background">
        <Image
          src={heroImage}
          alt=""
          class="hero__image"
          loading="eager"
          width={1920}
          height={1080}
        />
        <div class="hero__overlay"></div>
      </div>

      <div class="hero__content container">
        <h1 id="hero-heading" class="hero__title">
          Pintores Profesionales en Barcelona
        </h1>
        <p class="hero__subtitle">
          Transformamos tus espacios con calidad y precisión. Más de 15 años de experiencia.
        </p>
        <a href="#contacto" class="hero__cta">
          Solicita Presupuesto Gratis
        </a>
      </div>
    </section>
    ```
  - **Test**: Render hero and verify image loads, text readable

### 5.2 Hero Styles (Mobile-First)

- [ ] Create hero CSS with responsive layout
  - **Path**: `src/styles/components/hero.css`
  - **Acceptance Criteria**:
    ```css
    /* Mobile Base (320px+) */
    .hero {
      position: relative;
      min-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .hero__background {
      position: absolute;
      inset: 0;
      z-index: -1;
    }

    .hero__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .hero__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(10, 10, 10, 0.7),
        rgba(10, 10, 10, 0.9)
      );
    }

    .hero__content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding-block: var(--space-xl);
      animation: fadeInUp 0.8s ease-out;
    }

    .hero__title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
      margin-bottom: var(--space-md);
      color: var(--color-text-primary);
    }

    .hero__subtitle {
      font-size: var(--font-size-lg);
      line-height: var(--line-height-relaxed);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-xl);
      max-width: 42rem;
      margin-inline: auto;
    }

    .hero__cta {
      display: inline-block;
      padding: var(--space-sm) var(--space-lg);
      background-color: var(--color-accent);
      color: var(--color-bg-primary);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      border-radius: var(--radius-full);
      transition: background-color var(--transition-normal), transform var(--transition-fast);
      box-shadow: var(--shadow-md);
    }

    .hero__cta:hover,
    .hero__cta:focus-visible {
      background-color: var(--color-accent-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .hero__cta:active {
      transform: translateY(0);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(2rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Tablet (768px+) */
    @media (min-width: 768px) {
      .hero {
        min-height: 90vh;
      }

      .hero__title {
        font-size: var(--font-size-3xl);
      }

      .hero__subtitle {
        font-size: var(--font-size-xl);
      }

      .hero__cta {
        padding: var(--space-md) var(--space-xl);
        font-size: var(--font-size-lg);
      }
    }

    /* Desktop (1024px+) */
    @media (min-width: 1024px) {
      .hero {
        min-height: 95vh;
      }
    }
    ```
  - **Test**: Test on mobile (320px), tablet (768px), desktop (1024px+) viewports

### 5.3 Image Optimization

- [ ] Implement responsive image handling
  - **Method**: Use Astro Image component with srcset
  - **Acceptance Criteria**:
    - Image optimized to WebP/AVIF format
    - Multiple sizes generated (mobile, tablet, desktop)
    - Lazy loading disabled for hero (loading="eager")
    - Alt text empty (decorative image)
  - **Test**: Check Network tab for optimized image format, verify LCP under 2.5s

- [ ] Test hero component accessibility and performance
  - **Test Method**: Lighthouse audit + manual testing
  - **Acceptance Criteria**:
    - Text contrast ratio passes WCAG AA (4.5:1 minimum)
    - CTA button keyboard accessible
    - Hero loads without layout shift (CLS = 0)
    - LCP under 2.5 seconds
  - **Test**: Run Lighthouse, verify Accessibility score 95+

---

## Section 6: Services Component

### 6.1 Services Structure

- [ ] Create Services component with grid layout
  - **Path**: `src/components/Services.astro`
  - **Acceptance Criteria**:
    ```astro
    ---
    import '../styles/components/services.css';

    const services = [
      {
        id: 'pintura-interior',
        title: 'Pintura de Interiores',
        description: 'Transformamos tus espacios interiores con acabados perfectos y colores vibrantes.',
        icon: '🏠'
      },
      {
        id: 'pintura-exterior',
        title: 'Pintura de Exteriores',
        description: 'Protección duradera contra los elementos con pinturas de alta calidad.',
        icon: '🏢'
      },
      {
        id: 'restauracion',
        title: 'Restauración de Fachadas',
        description: 'Devolvemos la vida a tus fachadas con técnicas profesionales de restauración.',
        icon: '🎨'
      }
    ];
    ---

    <section id="servicios" class="services" aria-labelledby="services-heading">
      <div class="services__container container">
        <header class="services__header">
          <h2 id="services-heading" class="services__title">Nuestros Servicios</h2>
          <p class="services__subtitle">Soluciones profesionales de pintura para cada necesidad</p>
        </header>

        <div class="services__grid">
          {services.map((service) => (
            <article class="service-card" id={service.id}>
              <div class="service-card__icon" aria-hidden="true">
                {service.icon}
              </div>
              <h3 class="service-card__title">{service.title}</h3>
              <p class="service-card__description">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
    ```
  - **Test**: Render services section and verify 3 cards display

### 6.2 Services Styles (Mobile-First Responsive Grid)

- [ ] Create services CSS with mobile-first grid
  - **Path**: `src/styles/components/services.css`
  - **Acceptance Criteria**:
    ```css
    /* Mobile Base (320px+) - Single Column */
    .services {
      padding-block: var(--space-3xl);
      background-color: var(--color-bg-secondary);
    }

    .services__header {
      text-align: center;
      margin-bottom: var(--space-2xl);
    }

    .services__title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-md);
      color: var(--color-text-primary);
    }

    .services__subtitle {
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
      max-width: 42rem;
      margin-inline: auto;
    }

    .services__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }

    .service-card {
      background-color: var(--color-bg-tertiary);
      padding: var(--space-xl);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      transition:
        transform var(--transition-normal),
        box-shadow var(--transition-normal),
        border-color var(--transition-normal);
    }

    .service-card:hover,
    .service-card:focus-within {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--color-accent);
    }

    .service-card__icon {
      font-size: 3rem;
      margin-bottom: var(--space-md);
    }

    .service-card__title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--space-sm);
      color: var(--color-text-primary);
    }

    .service-card__description {
      font-size: var(--font-size-base);
      line-height: var(--line-height-relaxed);
      color: var(--color-text-secondary);
    }

    /* Tablet (768px+) - 2 Columns */
    @media (min-width: 768px) {
      .services__grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-xl);
      }

      .services__title {
        font-size: var(--font-size-3xl);
      }

      .services__subtitle {
        font-size: var(--font-size-lg);
      }
    }

    /* Desktop (1024px+) - 3 Columns */
    @media (min-width: 1024px) {
      .services__grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    /* Large Desktop (1440px+) - Enhanced spacing */
    @media (min-width: 1440px) {
      .services {
        padding-block: var(--space-3xl) calc(var(--space-3xl) + var(--space-xl));
      }
    }
    ```
  - **Test**: Resize from 320px to 1440px, verify grid changes: 1 col → 2 cols (768px) → 3 cols (1024px)

### 6.3 Services Accessibility

- [ ] Test services grid responsive behavior and accessibility
  - **Test Method**: Manual resize testing + automated accessibility scan
  - **Acceptance Criteria**:
    - Grid layout responsive at all breakpoints
    - Cards align properly without orphans
    - Hover states work with mouse and keyboard focus
    - Color contrast passes WCAG AA
    - Screen reader announces card content correctly
  - **Test**: Use Responsive Design Mode in browsers, run axe-core scan

---

## Section 7: Gallery/Carousel Component

### 7.1 Gallery Structure

- [ ] Create Gallery main component
  - **Path**: `src/components/Gallery.astro`
  - **Acceptance Criteria**:
    ```astro
    ---
    import { Image } from 'astro:assets';
    import CarouselControls from './CarouselControls';
    import '../styles/components/gallery.css';

    import img1 from '../assets/images/gallery/project-1.jpg';
    import img2 from '../assets/images/gallery/project-2.jpg';
    import img3 from '../assets/images/gallery/project-3.jpg';
    import img4 from '../assets/images/gallery/project-4.jpg';
    import img5 from '../assets/images/gallery/project-5.jpg';
    import img6 from '../assets/images/gallery/project-6.jpg';

    const galleryImages = [
      { src: img1, alt: 'Proyecto de pintura interior en salón' },
      { src: img2, alt: 'Fachada restaurada en Barcelona' },
      { src: img3, alt: 'Dormitorio pintado en tonos neutros' },
      { src: img4, alt: 'Oficina moderna pintada' },
      { src: img5, alt: 'Cocina renovada con pintura especial' },
      { src: img6, alt: 'Exterior de edificio pintado' }
    ];
    ---

    <section id="galeria" class="gallery" aria-labelledby="gallery-heading">
      <div class="gallery__container container">
        <header class="gallery__header">
          <h2 id="gallery-heading" class="gallery__title">Nuestros Trabajos</h2>
          <p class="gallery__subtitle">Proyectos realizados con excelencia</p>
        </header>

        <div class="gallery__carousel" role="region" aria-label="Carrusel de imágenes de proyectos">
          <div class="gallery__track" id="gallery-track">
            {galleryImages.map((image, index) => (
              <div class="gallery__slide" data-index={index}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  class="gallery__image"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
            ))}
          </div>

          <CarouselControls totalSlides={galleryImages.length} client:load />
        </div>
      </div>
    </section>
    ```
  - **Test**: Render gallery and verify all images load (lazy loading)

### 7.2 Carousel Controls Component (Astro Island)

- [ ] Create interactive carousel controls
  - **Path**: `src/components/CarouselControls.tsx`
  - **Acceptance Criteria**:
    ```tsx
    import { useState, useEffect } from 'react';

    interface Props {
      totalSlides: number;
    }

    export default function CarouselControls({ totalSlides }: Props) {
      const [currentSlide, setCurrentSlide] = useState(0);

      const goToSlide = (index: number) => {
        setCurrentSlide(index);
        const track = document.getElementById('gallery-track');
        if (track) {
          track.style.transform = `translateX(-${index * 100}%)`;
        }
      };

      const nextSlide = () => {
        const next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
      };

      const prevSlide = () => {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prev);
      };

      useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'ArrowLeft') prevSlide();
          if (e.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [currentSlide]);

      return (
        <div className="carousel-controls">
          <button
            className="carousel-controls__button carousel-controls__button--prev"
            onClick={prevSlide}
            aria-label="Imagen anterior"
          >
            ←
          </button>

          <div className="carousel-controls__dots" role="tablist" aria-label="Navegación de carrusel">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`carousel-controls__dot ${index === currentSlide ? 'carousel-controls__dot--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir a imagen ${index + 1}`}
                aria-selected={index === currentSlide}
                role="tab"
              />
            ))}
          </div>

          <button
            className="carousel-controls__button carousel-controls__button--next"
            onClick={nextSlide}
            aria-label="Imagen siguiente"
          >
            →
          </button>
        </div>
      );
    }
    ```
  - **Test**: Click prev/next buttons, verify carousel navigates correctly

### 7.3 Gallery Styles (Mobile-First)

- [ ] Create gallery CSS with responsive carousel
  - **Path**: `src/styles/components/gallery.css`
  - **Acceptance Criteria**:
    ```css
    /* Mobile Base (320px+) */
    .gallery {
      padding-block: var(--space-3xl);
      background-color: var(--color-bg-primary);
    }

    .gallery__header {
      text-align: center;
      margin-bottom: var(--space-2xl);
    }

    .gallery__title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-md);
      color: var(--color-text-primary);
    }

    .gallery__subtitle {
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
    }

    .gallery__carousel {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-lg);
    }

    .gallery__track {
      display: flex;
      transition: transform var(--transition-slow);
    }

    .gallery__slide {
      min-width: 100%;
      flex-shrink: 0;
    }

    .gallery__image {
      width: 100%;
      height: auto;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      border-radius: var(--radius-lg);
    }

    /* Carousel Controls */
    .carousel-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-md);
      margin-top: var(--space-lg);
    }

    .carousel-controls__button {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-bg-tertiary);
      color: var(--color-text-primary);
      border-radius: var(--radius-full);
      font-size: var(--font-size-xl);
      transition: background-color var(--transition-fast), transform var(--transition-fast);
      border: 1px solid var(--color-border);
    }

    .carousel-controls__button:hover,
    .carousel-controls__button:focus-visible {
      background-color: var(--color-accent);
      color: var(--color-bg-primary);
      transform: scale(1.1);
    }

    .carousel-controls__dots {
      display: flex;
      gap: var(--space-xs);
    }

    .carousel-controls__dot {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: var(--radius-full);
      background-color: var(--color-bg-tertiary);
      border: 2px solid var(--color-border);
      transition: background-color var(--transition-fast), transform var(--transition-fast);
    }

    .carousel-controls__dot--active {
      background-color: var(--color-accent);
      border-color: var(--color-accent);
      transform: scale(1.25);
    }

    .carousel-controls__dot:hover,
    .carousel-controls__dot:focus-visible {
      background-color: var(--color-accent-hover);
      transform: scale(1.25);
    }

    /* Tablet (768px+) */
    @media (min-width: 768px) {
      .gallery__title {
        font-size: var(--font-size-3xl);
      }

      .gallery__subtitle {
        font-size: var(--font-size-lg);
      }

      .carousel-controls__button {
        width: 3rem;
        height: 3rem;
      }

      .carousel-controls__dot {
        width: 1rem;
        height: 1rem;
      }
    }

    /* Desktop (1024px+) */
    @media (min-width: 1024px) {
      .gallery__carousel {
        max-width: 900px;
        margin-inline: auto;
      }
    }
    ```
  - **Test**: Test carousel on mobile (touch-friendly controls), tablet, desktop

### 7.4 Carousel Functionality Testing

- [ ] Test carousel navigation and accessibility
  - **Test Method**: Manual testing + automated accessibility
  - **Acceptance Criteria**:
    - Carousel navigates with prev/next buttons
    - Dots navigation works (click to jump to slide)
    - Keyboard arrow keys navigate slides
    - Images lazy load correctly
    - Touch swipe works on mobile (if implemented)
    - ARIA labels announced by screen reader
  - **Test**: Use keyboard only, test on mobile device, run axe-core

---

## Section 8: FAQ Component

### 8.1 FAQ Structure

- [ ] Create FAQ main component
  - **Path**: `src/components/FAQ.astro`
  - **Acceptance Criteria**:
    ```astro
    ---
    import FAQItem from './FAQItem';
    import '../styles/components/faq.css';

    const faqs = [
      {
        id: 'faq-1',
        question: '¿Cuánto tiempo tarda un proyecto de pintura?',
        answer: 'El tiempo depende del tamaño del proyecto. Un piso estándar de 80m² suele tardar entre 3-5 días. Proyectos más grandes pueden llevar 1-2 semanas.'
      },
      {
        id: 'faq-2',
        question: '¿Qué tipo de pintura utilizan?',
        answer: 'Utilizamos pinturas de alta calidad de marcas reconocidas como Bruguer, Titan y Montó. Todas son de bajo olor y respetuosas con el medio ambiente.'
      },
      {
        id: 'faq-3',
        question: '¿Ofrecen garantía en sus trabajos?',
        answer: 'Sí, todos nuestros trabajos tienen garantía de 2 años contra defectos de aplicación. También asesoramos sobre el mantenimiento adecuado.'
      },
      {
        id: 'faq-4',
        question: '¿Trabajan en fines de semana?',
        answer: 'Sí, podemos trabajar en fines de semana si el cliente lo necesita, con un pequeño suplemento. Nos adaptamos a tus horarios.'
      }
    ];
    ---

    <section id="faq" class="faq" aria-labelledby="faq-heading">
      <div class="faq__container container">
        <header class="faq__header">
          <h2 id="faq-heading" class="faq__title">Preguntas Frecuentes</h2>
          <p class="faq__subtitle">Resolvemos tus dudas sobre nuestros servicios</p>
        </header>

        <div class="faq__list">
          {faqs.map((faq) => (
            <FAQItem
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
              client:load
            />
          ))}
        </div>
      </div>
    </section>
    ```
  - **Test**: Render FAQ section and verify all questions display

### 8.2 FAQ Item Component (Astro Island)

- [ ] Create interactive FAQ accordion item
  - **Path**: `src/components/FAQItem.tsx`
  - **Acceptance Criteria**:
    ```tsx
    import { useState } from 'react';

    interface Props {
      id: string;
      question: string;
      answer: string;
    }

    export default function FAQItem({ id, question, answer }: Props) {
      const [isOpen, setIsOpen] = useState(false);

      const toggleOpen = () => setIsOpen(!isOpen);

      return (
        <article className="faq-item" id={id}>
          <button
            className="faq-item__question"
            onClick={toggleOpen}
            aria-expanded={isOpen}
            aria-controls={`${id}-answer`}
          >
            <span className="faq-item__question-text">{question}</span>
            <span className={`faq-item__icon ${isOpen ? 'faq-item__icon--open' : ''}`} aria-hidden="true">
              +
            </span>
          </button>

          <div
            id={`${id}-answer`}
            className={`faq-item__answer ${isOpen ? 'faq-item__answer--open' : ''}`}
            role="region"
            aria-labelledby={`${id}-question`}
          >
            <div className="faq-item__answer-content">
              <p>{answer}</p>
            </div>
          </div>
        </article>
      );
    }
    ```
  - **Test**: Click question and verify answer expands/collapses

### 8.3 FAQ Styles (Mobile-First)

- [ ] Create FAQ CSS with accordion animation
  - **Path**: `src/styles/components/faq.css`
  - **Acceptance Criteria**:
    ```css
    /* Mobile Base (320px+) */
    .faq {
      padding-block: var(--space-3xl);
      background-color: var(--color-bg-secondary);
    }

    .faq__header {
      text-align: center;
      margin-bottom: var(--space-2xl);
    }

    .faq__title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-md);
      color: var(--color-text-primary);
    }

    .faq__subtitle {
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
    }

    .faq__list {
      max-width: 48rem;
      margin-inline: auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .faq-item {
      background-color: var(--color-bg-tertiary);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      overflow: hidden;
      transition: border-color var(--transition-normal);
    }

    .faq-item:hover,
    .faq-item:focus-within {
      border-color: var(--color-accent);
    }

    .faq-item__question {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-md);
      text-align: left;
      gap: var(--space-md);
      cursor: pointer;
      transition: background-color var(--transition-fast);
    }

    .faq-item__question:hover,
    .faq-item__question:focus-visible {
      background-color: var(--color-bg-primary);
    }

    .faq-item__question-text {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
    }

    .faq-item__icon {
      font-size: var(--font-size-2xl);
      color: var(--color-accent);
      transition: transform var(--transition-normal);
      line-height: 1;
      flex-shrink: 0;
    }

    .faq-item__icon--open {
      transform: rotate(45deg);
    }

    .faq-item__answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height var(--transition-slow);
    }

    .faq-item__answer--open {
      max-height: 20rem;
    }

    .faq-item__answer-content {
      padding: 0 var(--space-md) var(--space-md) var(--space-md);
    }

    .faq-item__answer-content p {
      font-size: var(--font-size-base);
      line-height: var(--line-height-relaxed);
      color: var(--color-text-secondary);
    }

    /* Tablet (768px+) */
    @media (min-width: 768px) {
      .faq__title {
        font-size: var(--font-size-3xl);
      }

      .faq__subtitle {
        font-size: var(--font-size-lg);
      }

      .faq-item__question {
        padding: var(--space-lg);
      }

      .faq-item__question-text {
        font-size: var(--font-size-lg);
      }

      .faq-item__answer-content {
        padding: 0 var(--space-lg) var(--space-lg) var(--space-lg);
      }
    }

    /* Desktop (1024px+) */
    @media (min-width: 1024px) {
      .faq__list {
        max-width: 56rem;
      }
    }
    ```
  - **Test**: Expand/collapse accordion and verify smooth animation

### 8.4 FAQ Accessibility

- [ ] Test FAQ accordion accessibility and interaction
  - **Test Method**: Keyboard testing + screen reader
  - **Acceptance Criteria**:
    - Tab navigates through questions
    - Enter/Space expands/collapses answer
    - Only one accordion open at a time (optional behavior)
    - ARIA expanded state correctly announced
    - Smooth expand/collapse animation
    - Focus visible on question buttons
  - **Test**: Use keyboard only, test with NVDA/JAWS, run axe-core

---

## Section 9: Contact Form Component

### 9.1 Contact Form Structure

- [ ] Create ContactForm component with validation
  - **Path**: `src/components/ContactForm.astro`
  - **Acceptance Criteria**:
    ```astro
    ---
    import ContactFormHandler from './ContactFormHandler';
    import '../styles/components/contact.css';
    ---

    <section id="contacto" class="contact" aria-labelledby="contact-heading">
      <div class="contact__container container">
        <header class="contact__header">
          <h2 id="contact-heading" class="contact__title">Solicita tu Presupuesto</h2>
          <p class="contact__subtitle">Respuesta en menos de 24 horas</p>
        </header>

        <form
          class="contact-form"
          action="/api/submit-form"
          method="POST"
          data-vercel-form
          id="contact-form"
        >
          <div class="contact-form__row">
            <div class="contact-form__field">
              <label for="name" class="contact-form__label">
                Nombre completo <span aria-label="requerido">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="contact-form__input"
                required
                aria-required="true"
                placeholder="Tu nombre"
              />
            </div>

            <div class="contact-form__field">
              <label for="email" class="contact-form__label">
                Email <span aria-label="requerido">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="contact-form__input"
                required
                aria-required="true"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div class="contact-form__row">
            <div class="contact-form__field">
              <label for="phone" class="contact-form__label">
                Teléfono <span aria-label="requerido">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                class="contact-form__input"
                required
                aria-required="true"
                placeholder="(+34) 638 94 39 62"
                pattern="[0-9+\s\(\)-]+"
              />
            </div>

            <div class="contact-form__field">
              <label for="service" class="contact-form__label">
                Servicio de interés
              </label>
              <select id="service" name="service" class="contact-form__select">
                <option value="">Selecciona un servicio</option>
                <option value="interior">Pintura de Interiores</option>
                <option value="exterior">Pintura de Exteriores</option>
                <option value="restauracion">Restauración de Fachadas</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div class="contact-form__field">
            <label for="message" class="contact-form__label">
              Mensaje <span aria-label="requerido">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              class="contact-form__textarea"
              rows="5"
              required
              aria-required="true"
              placeholder="Cuéntanos sobre tu proyecto..."
            ></textarea>
          </div>

          <button type="submit" class="contact-form__submit">
            Enviar Solicitud
          </button>

          <div class="contact-form__status" role="status" aria-live="polite"></div>
        </form>

        <ContactFormHandler client:load />
      </div>
    </section>
    ```
  - **Test**: Render form and verify all fields present

### 9.2 Contact Form Handler (Astro Island)

- [ ] Create client-side form validation handler
  - **Path**: `src/components/ContactFormHandler.tsx`
  - **Acceptance Criteria**:
    ```tsx
    import { useEffect } from 'react';

    export default function ContactFormHandler() {
      useEffect(() => {
        const form = document.getElementById('contact-form') as HTMLFormElement;
        const statusDiv = document.querySelector('.contact-form__status') as HTMLDivElement;

        if (!form || !statusDiv) return;

        const handleSubmit = async (e: SubmitEvent) => {
          e.preventDefault();

          const formData = new FormData(form);
          statusDiv.textContent = 'Enviando...';
          statusDiv.className = 'contact-form__status contact-form__status--loading';

          try {
            const response = await fetch(form.action, {
              method: 'POST',
              body: formData,
              headers: {
                'Accept': 'application/json'
              }
            });

            if (response.ok) {
              statusDiv.textContent = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
              statusDiv.className = 'contact-form__status contact-form__status--success';
              form.reset();
            } else {
              throw new Error('Error al enviar el formulario');
            }
          } catch (error) {
            statusDiv.textContent = 'Error al enviar. Por favor, intenta de nuevo o llámanos al (+34) 638 94 39 62.';
            statusDiv.className = 'contact-form__status contact-form__status--error';
          }
        };

        form.addEventListener('submit', handleSubmit);
        return () => form.removeEventListener('submit', handleSubmit);
      }, []);

      return null;
    }
    ```
  - **Test**: Submit form and verify validation + success/error messages

### 9.3 Contact Form Styles (Mobile-First)

- [ ] Create contact form CSS with responsive layout
  - **Path**: `src/styles/components/contact.css`
  - **Acceptance Criteria**:
    ```css
    /* Mobile Base (320px+) - Single Column */
    .contact {
      padding-block: var(--space-3xl);
      background-color: var(--color-bg-primary);
    }

    .contact__header {
      text-align: center;
      margin-bottom: var(--space-2xl);
    }

    .contact__title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-md);
      color: var(--color-text-primary);
    }

    .contact__subtitle {
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
    }

    .contact-form {
      max-width: 48rem;
      margin-inline: auto;
      background-color: var(--color-bg-secondary);
      padding: var(--space-xl);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
    }

    .contact-form__row {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      margin-bottom: var(--space-md);
    }

    .contact-form__field {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .contact-form__label {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
    }

    .contact-form__label span {
      color: var(--color-accent);
    }

    .contact-form__input,
    .contact-form__select,
    .contact-form__textarea {
      width: 100%;
      padding: var(--space-sm);
      background-color: var(--color-bg-tertiary);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
    }

    .contact-form__input:focus,
    .contact-form__select:focus,
    .contact-form__textarea:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.1);
    }

    .contact-form__input::placeholder,
    .contact-form__textarea::placeholder {
      color: var(--color-text-tertiary);
    }

    .contact-form__textarea {
      resize: vertical;
      min-height: 8rem;
    }

    .contact-form__submit {
      width: 100%;
      padding: var(--space-md);
      background-color: var(--color-accent);
      color: var(--color-bg-primary);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      border-radius: var(--radius-full);
      transition: background-color var(--transition-normal), transform var(--transition-fast);
      cursor: pointer;
      margin-top: var(--space-md);
    }

    .contact-form__submit:hover,
    .contact-form__submit:focus-visible {
      background-color: var(--color-accent-hover);
      transform: translateY(-2px);
    }

    .contact-form__submit:active {
      transform: translateY(0);
    }

    .contact-form__status {
      margin-top: var(--space-md);
      padding: var(--space-sm);
      text-align: center;
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
    }

    .contact-form__status--loading {
      background-color: var(--color-bg-tertiary);
      color: var(--color-text-secondary);
    }

    .contact-form__status--success {
      background-color: rgba(34, 197, 94, 0.1);
      color: var(--color-success);
      border: 1px solid var(--color-success);
    }

    .contact-form__status--error {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--color-error);
      border: 1px solid var(--color-error);
    }

    /* Tablet (768px+) - 2 Column Layout */
    @media (min-width: 768px) {
      .contact__title {
        font-size: var(--font-size-3xl);
      }

      .contact__subtitle {
        font-size: var(--font-size-lg);
      }

      .contact-form {
        padding: var(--space-2xl);
      }

      .contact-form__row {
        flex-direction: row;
      }

      .contact-form__field {
        flex: 1;
      }
    }

    /* Desktop (1024px+) - Refined Spacing */
    @media (min-width: 1024px) {
      .contact-form {
        max-width: 56rem;
      }
    }
    ```
  - **Test**: Test form layout on mobile (single column), tablet (2 columns), desktop

### 9.4 Vercel Forms Integration

- [ ] Configure Vercel Forms integration
  - **Path**: Create API route at `src/pages/api/submit-form.ts`
  - **Acceptance Criteria**:
    ```typescript
    import type { APIRoute } from 'astro';

    export const POST: APIRoute = async ({ request }) => {
      const formData = await request.formData();
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const message = formData.get('message');

      // Vercel Forms automatically captures form submissions
      // when data-vercel-form attribute is present
      // This route can add custom logic (email notifications, CRM integration, etc.)

      // For now, just return success
      return new Response(
        JSON.stringify({ success: true, message: 'Formulario recibido' }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    };
    ```
  - **Test**: Submit form and verify data received in Vercel dashboard

- [ ] Implement HTML5 form validation
  - **Acceptance Criteria**:
    - Required fields validated before submission
    - Email format validated
    - Phone pattern validated (numbers, +, parentheses, hyphens)
    - Custom error messages displayed
  - **Test**: Try submitting invalid data, verify browser validation triggers

### 9.5 Contact Form Testing

- [ ] Test form submission and validation flow
  - **Test Method**: Manual testing + automated E2E test
  - **Acceptance Criteria**:
    - Form submits correctly with valid data
    - Validation prevents submission of invalid data
    - Success message appears after submission
    - Error message appears if submission fails
    - Form resets after successful submission
    - Vercel Forms receives data
  - **Test**: Fill form with valid/invalid data, check Vercel Forms dashboard

---

## Section 10: Footer Component

### 10.1 Footer Structure

- [ ] Create Footer component with contact info
  - **Path**: `src/components/Footer.astro`
  - **Acceptance Criteria**:
    ```astro
    ---
    import '../styles/components/footer.css';
    ---

    <footer class="footer">
      <div class="footer__container container">
        <div class="footer__content">
          <div class="footer__section">
            <h3 class="footer__title">Pintor Profesional</h3>
            <p class="footer__description">
              Servicios de pintura de alta calidad en Barcelona y alrededores desde 2009.
            </p>
          </div>

          <div class="footer__section">
            <h4 class="footer__heading">Contacto</h4>
            <ul class="footer__list">
              <li>
                <a href="tel:+34638943962" class="footer__link">
                  📞 (+34) 638 94 39 62
                </a>
              </li>
              <li>
                <a href="mailto:info@pintorprofesional.es" class="footer__link">
                  ✉️ info@pintorprofesional.es
                </a>
              </li>
              <li class="footer__text">
                📍 Barcelona, España
              </li>
            </ul>
          </div>

          <div class="footer__section">
            <h4 class="footer__heading">Navegación</h4>
            <ul class="footer__list">
              <li><a href="#servicios" class="footer__link">Servicios</a></li>
              <li><a href="#galeria" class="footer__link">Galería</a></li>
              <li><a href="#faq" class="footer__link">Preguntas</a></li>
              <li><a href="#contacto" class="footer__link">Contacto</a></li>
            </ul>
          </div>

          <div class="footer__section">
            <h4 class="footer__heading">Legal</h4>
            <ul class="footer__list">
              <li><a href="/aviso-legal" class="footer__link">Aviso Legal</a></li>
              <li><a href="/privacidad" class="footer__link">Política de Privacidad</a></li>
              <li><a href="/cookies" class="footer__link">Política de Cookies</a></li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <p class="footer__copyright">
            &copy; {new Date().getFullYear()} Pintor Profesional. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
    ```
  - **Test**: Render footer and verify all sections display

### 10.2 Footer Styles (Mobile-First)

- [ ] Create footer CSS with responsive multi-column layout
  - **Path**: `src/styles/components/footer.css`
  - **Acceptance Criteria**:
    ```css
    /* Mobile Base (320px+) - Stacked Layout */
    .footer {
      background-color: var(--color-bg-secondary);
      border-top: 1px solid var(--color-border);
      padding-block: var(--space-2xl);
    }

    .footer__content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);
      margin-bottom: var(--space-xl);
    }

    .footer__section {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .footer__title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-accent);
      margin-bottom: var(--space-xs);
    }

    .footer__description {
      font-size: var(--font-size-sm);
      line-height: var(--line-height-relaxed);
      color: var(--color-text-secondary);
    }

    .footer__heading {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin-bottom: var(--space-xs);
    }

    .footer__list {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .footer__link {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      transition: color var(--transition-fast);
    }

    .footer__link:hover,
    .footer__link:focus-visible {
      color: var(--color-accent);
    }

    .footer__text {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }

    .footer__bottom {
      padding-top: var(--space-lg);
      border-top: 1px solid var(--color-border);
      text-align: center;
    }

    .footer__copyright {
      font-size: var(--font-size-xs);
      color: var(--color-text-tertiary);
    }

    /* Tablet (768px+) - 2 Columns */
    @media (min-width: 768px) {
      .footer__content {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-2xl);
      }
    }

    /* Desktop (1024px+) - 4 Columns */
    @media (min-width: 1024px) {
      .footer__content {
        grid-template-columns: 2fr 1fr 1fr 1fr;
      }

      .footer__bottom {
        text-align: left;
      }
    }
    ```
  - **Test**: Resize from mobile to desktop, verify layout: 1 col → 2 cols (768px) → 4 cols (1024px)

### 10.3 Footer Testing

- [ ] Test footer layout and links
  - **Test Method**: Manual testing across viewports
  - **Acceptance Criteria**:
    - Footer responsive at all breakpoints
    - All links functional (tel:, mailto:, internal anchors)
    - Contact information visible and readable
    - Phone number correctly formatted: (+34) 638 94 39 62
    - Copyright year dynamically generated
  - **Test**: Click all links, test phone/email links on mobile device

---

## Section 11: Images and Assets

### 11.1 Image Directory Setup

- [ ] Create images directory structure
  - **Paths to create**:
    ```
    src/assets/images/
    ├── hero-background.jpg
    ├── gallery/
    │   ├── project-1.jpg
    │   ├── project-2.jpg
    │   ├── project-3.jpg
    │   ├── project-4.jpg
    │   ├── project-5.jpg
    │   └── project-6.jpg
    └── og-default.jpg
    ```
  - **Acceptance Criteria**: All directories created, placeholder images added
  - **Test**: Verify images import correctly in components

- [ ] Add example project photos for painter services
  - **Method**: Use high-quality stock photos or client project photos
  - **Acceptance Criteria**:
    - Minimum 1920x1080 for hero background
    - Gallery images minimum 800x600
    - All images optimized (compressed before adding to project)
  - **Test**: Check file sizes (hero <500KB, gallery <300KB each)

### 11.2 Astro Image Configuration

- [ ] Configure Astro Image component for optimization
  - **Path**: `astro.config.mjs` (already configured in Section 1.2)
  - **Acceptance Criteria**:
    - Sharp service enabled for image optimization
    - Automatic WebP/AVIF format generation
    - Responsive srcset generated
  - **Test**: Build project and verify images in dist/ are optimized

- [ ] Implement lazy loading with Astro Image
  - **Method**: Use `loading="lazy"` attribute on non-critical images
  - **Acceptance Criteria**:
    - Hero image: `loading="eager"`
    - Gallery images: `loading="lazy"`
    - All other images: `loading="lazy"`
  - **Test**: Check Network tab, verify lazy images load on scroll

### 11.3 Responsive Image Sizes

- [ ] Create responsive image sizes with srcset
  - **Example Implementation**:
    ```astro
    <Image
      src={image}
      alt={alt}
      widths={[320, 640, 768, 1024, 1280, 1920]}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      loading="lazy"
    />
    ```
  - **Acceptance Criteria**:
    - Multiple image sizes generated for different viewports
    - Sizes attribute matches breakpoints
    - Browser loads appropriate image size
  - **Test**: Check Network tab at different viewport sizes, verify correct image size loaded

### 11.4 Image Optimization Testing

- [ ] Test image loading performance
  - **Test Method**: Lighthouse audit + Network analysis
  - **Acceptance Criteria**:
    - Images optimized to modern formats (WebP/AVIF)
    - Lazy loading works correctly (images load on scroll)
    - No visual regressions (images display correctly)
    - LCP (Largest Contentful Paint) under 2.5s
    - No layout shift from images (CLS = 0)
  - **Test**: Run Lighthouse, check Performance score 90+

---

## Section 12: SEO and Metadata

### 12.1 Page Metadata

- [ ] Implement meta descriptions for each page
  - **Path**: Each page component (e.g., `src/pages/index.astro`)
  - **Acceptance Criteria**:
    ```astro
    ---
    import PageLayout from '../layouts/PageLayout.astro';
    ---

    <PageLayout
      title="Pintor Profesional Barcelona | Pintores Expertos en Interiores y Exteriores"
      description="Servicios profesionales de pintura en Barcelona. Especialistas en pintura de interiores, exteriores y restauración de fachadas. Presupuesto gratis. (+34) 638 94 39 62"
    >
      <!-- Page content -->
    </PageLayout>
    ```
  - **Test**: View page source, verify meta description present

- [ ] Add Open Graph tags for social sharing
  - **Path**: `src/layouts/Layout.astro` (already implemented in Section 3.1)
  - **Acceptance Criteria**:
    - og:title matches page title
    - og:description matches meta description
    - og:image points to absolute URL (1200x630px recommended)
    - og:url is canonical URL
    - og:type is "website"
  - **Test**: Use Open Graph debugger (Facebook, LinkedIn) to verify preview

### 12.2 Structured Data

- [ ] Create schema.org JSON-LD for local business
  - **Path**: `src/components/StructuredData.astro`
  - **Acceptance Criteria**:
    ```astro
    ---
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "PaintingContractor",
      "name": "Pintor Profesional",
      "image": "https://pintorprofesional.es/og-default.jpg",
      "telephone": "+34638943962",
      "email": "info@pintorprofesional.es",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Barcelona",
        "addressCountry": "ES"
      },
      "areaServed": {
        "@type": "City",
        "name": "Barcelona"
      },
      "priceRange": "€€",
      "openingHours": "Mo-Fr 09:00-18:00",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "47"
      }
    };
    ---

    <script type="application/ld+json" set:html={JSON.stringify(businessSchema)} />
    ```
  - **Test**: Validate with Google Rich Results Test

- [ ] Add StructuredData component to Layout
  - **Path**: `src/layouts/Layout.astro`
  - **Acceptance Criteria**: Import and render StructuredData in <head>
  - **Test**: View page source, verify JSON-LD script present

### 12.3 Sitemap and Robots

- [ ] Generate sitemap.xml
  - **Method**: Use Astro sitemap integration
  - **Command**: `npm install @astrojs/sitemap`
  - **Path**: Update `astro.config.mjs`:
    ```javascript
    import sitemap from '@astrojs/sitemap';

    export default defineConfig({
      site: 'https://pintorprofesional.es',
      integrations: [sitemap()]
    });
    ```
  - **Acceptance Criteria**: Sitemap generated at build time in dist/sitemap-0.xml
  - **Test**: Build project, verify sitemap.xml exists and contains all pages

- [ ] Create robots.txt
  - **Path**: `public/robots.txt`
  - **Acceptance Criteria**:
    ```
    User-agent: *
    Allow: /
    Sitemap: https://pintorprofesional.es/sitemap-0.xml
    ```
  - **Test**: Access /robots.txt in browser, verify content

### 12.4 Canonical URLs

- [ ] Add canonical URLs to all pages
  - **Path**: `src/layouts/Layout.astro` (already implemented in Section 3.1)
  - **Acceptance Criteria**:
    - Canonical link tag in <head>
    - URL matches current page (no trailing slashes inconsistencies)
    - Absolute URL with domain
  - **Test**: View page source, verify canonical link present and correct

### 12.5 SEO Testing

- [ ] Test SEO implementation
  - **Test Method**: Google Search Console + Lighthouse + Schema validator
  - **Acceptance Criteria**:
    - All meta tags render correctly
    - Schema.org markup valid (no errors in Rich Results Test)
    - Sitemap accessible and valid
    - Canonical URLs correct
    - Lighthouse SEO score 95+
  - **Test**: Run Lighthouse SEO audit, submit sitemap to Google Search Console

---

## Section 13: Accessibility

### 13.1 WCAG Compliance

- [ ] Verify WCAG 2.1 Level AA compliance for all components
  - **Test Method**: Manual accessibility audit + automated tools
  - **Acceptance Criteria**:
    - All interactive elements keyboard accessible
    - All images have appropriate alt text
    - Form fields have associated labels
    - ARIA attributes used correctly
    - Landmark regions defined (header, nav, main, footer)
    - Headings hierarchy correct (no skipped levels)
  - **Test**: Run axe DevTools, WAVE browser extension

### 13.2 Color Contrast

- [ ] Test color contrast ratios (WCAG AA minimum 4.5:1)
  - **Test Method**: WebAIM Contrast Checker + Chrome DevTools
  - **Acceptance Criteria**:
    - Normal text: 4.5:1 minimum
    - Large text (18pt+ or 14pt+ bold): 3:1 minimum
    - UI components and graphics: 3:1 minimum
    - Accent color (#FF7A00) on dark background passes
  - **Test**: Check all text/background combinations with contrast checker

### 13.3 Keyboard Navigation

- [ ] Test keyboard navigation flow
  - **Test Method**: Manual keyboard-only testing
  - **Acceptance Criteria**:
    - Tab key navigates through all interactive elements
    - Focus order logical (matches visual order)
    - Skip to main content link provided (optional)
    - No keyboard traps (can escape all widgets)
    - Enter/Space activates buttons/links
    - Escape closes modals/menus
  - **Test**: Disconnect mouse, navigate entire site with keyboard only

### 13.4 ARIA and Screen Reader

- [ ] Implement ARIA labels where necessary
  - **Components to check**: Header, Gallery, FAQ, Contact Form
  - **Acceptance Criteria**:
    - Buttons have aria-label if text not visible
    - Expanded states use aria-expanded
    - Live regions use aria-live for dynamic content
    - Hidden content uses aria-hidden="true"
    - Form errors announced to screen readers
  - **Test**: Review each component for correct ARIA usage

- [ ] Test screen reader compatibility
  - **Test Method**: NVDA (Windows), JAWS (Windows), VoiceOver (Mac)
  - **Acceptance Criteria**:
    - All content announced correctly
    - Navigation landmarks announced
    - Form fields and labels associated
    - Button states announced (expanded/collapsed)
    - Error messages announced
  - **Test**: Navigate site with screen reader, verify announcements

### 13.5 Comprehensive Accessibility Testing

- [ ] Run automated accessibility audit with axe-core
  - **Method**: Install axe DevTools browser extension OR integrate @axe-core/playwright
  - **Acceptance Criteria**:
    - Zero critical accessibility violations
    - Zero serious violations
    - Document and plan fixes for moderate/minor issues
  - **Test**: Run axe scan on all pages, generate report

- [ ] Create accessibility test suite with Playwright + axe
  - **Path**: Create `e2e/accessibility.spec.ts`
  - **Acceptance Criteria**:
    ```typescript
    import { test, expect } from '@playwright/test';
    import AxeBuilder from '@axe-core/playwright';

    test.describe('Accessibility Tests', () => {
      test('Homepage should not have accessibility violations', async ({ page }) => {
        await page.goto('/');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
      });

      test('Contact form should be keyboard accessible', async ({ page }) => {
        await page.goto('/#contacto');
        await page.keyboard.press('Tab'); // Navigate to first form field
        await page.keyboard.type('Test User');
        // Continue testing keyboard navigation
      });
    });
    ```
  - **Test**: Run `npm run test:e2e` and verify accessibility tests pass

---

## Section 14: Testing (COMPREHENSIVE - MANDATORY)

### 14.1 Vitest Setup for Unit Tests

- [ ] Set up Vitest configuration
  - **Path**: `vitest.config.ts`
  - **Acceptance Criteria**:
    ```typescript
    import { defineConfig } from 'vitest/config';

    export default defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts'
      }
    });
    ```
  - **Test**: Run `npm test` and verify Vitest runs

- [ ] Create Vitest setup file
  - **Path**: `vitest.setup.ts`
  - **Acceptance Criteria**:
    ```typescript
    import '@testing-library/jest-dom/vitest';
    ```
  - **Test**: Import works without errors

### 14.2 Component Unit Tests

- [ ] Create unit tests for Header component
  - **Path**: `src/components/Header.test.ts`
  - **Acceptance Criteria**:
    - Test: Header renders with logo
    - Test: Navigation links present
    - Test: Mobile menu toggle visible on mobile
  - **Test**: Run `npm test Header.test.ts`

- [ ] Create unit tests for Hero component
  - **Path**: `src/components/Hero.test.ts`
  - **Acceptance Criteria**:
    - Test: Hero title and subtitle render
    - Test: CTA button present with correct href
    - Test: Background image loads
  - **Test**: Run `npm test Hero.test.ts`

- [ ] Create unit tests for Services component
  - **Path**: `src/components/Services.test.ts`
  - **Acceptance Criteria**:
    - Test: All 3 service cards render
    - Test: Service titles and descriptions present
    - Test: Icons render for each service
  - **Test**: Run `npm test Services.test.ts`

- [ ] Create unit tests for Gallery component
  - **Path**: `src/components/Gallery.test.ts`
  - **Acceptance Criteria**:
    - Test: Gallery renders all images
    - Test: Carousel controls render
    - Test: Navigation buttons present
  - **Test**: Run `npm test Gallery.test.ts`

- [ ] Create unit tests for FAQ component
  - **Path**: `src/components/FAQ.test.ts`
  - **Acceptance Criteria**:
    - Test: All FAQ items render
    - Test: Questions visible, answers hidden initially
    - Test: Click expands answer
  - **Test**: Run `npm test FAQ.test.ts`

- [ ] Create unit tests for ContactForm component
  - **Path**: `src/components/ContactForm.test.ts`
  - **Acceptance Criteria**:
    - Test: All form fields render
    - Test: Required fields marked correctly
    - Test: Submit button present
  - **Test**: Run `npm test ContactForm.test.ts`

- [ ] Create unit tests for Footer component
  - **Path**: `src/components/Footer.test.ts`
  - **Acceptance Criteria**:
    - Test: Footer renders with all sections
    - Test: Contact phone number present: (+34) 638 94 39 62
    - Test: All navigation links present
  - **Test**: Run `npm test Footer.test.ts`

### 14.3 Playwright Setup for E2E Tests

- [ ] Set up Playwright configuration
  - **Path**: `playwright.config.ts`
  - **Acceptance Criteria**:
    ```typescript
    import { defineConfig, devices } from '@playwright/test';

    export default defineConfig({
      testDir: './e2e',
      fullyParallel: true,
      forbidOnly: !!process.env.CI,
      retries: process.env.CI ? 2 : 0,
      workers: process.env.CI ? 1 : undefined,
      reporter: 'html',
      use: {
        baseURL: 'http://localhost:4321',
        trace: 'on-first-retry',
      },
      projects: [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
        {
          name: 'Mobile Chrome',
          use: { ...devices['Pixel 5'] },
        },
      ],
      webServer: {
        command: 'npm run dev',
        url: 'http://localhost:4321',
        reuseExistingServer: !process.env.CI,
      },
    });
    ```
  - **Test**: Run `npm run test:e2e` and verify Playwright starts dev server

### 14.4 E2E Test Scenarios

- [ ] E2E Test: User navigates header menu
  - **Path**: `e2e/navigation.spec.ts`
  - **Acceptance Criteria**:
    - Test: Click "Servicios" link navigates to #servicios
    - Test: Click "Galería" link navigates to #galeria
    - Test: Mobile menu opens and closes correctly
    - Test: All navigation links functional
  - **Test**: Run `npx playwright test navigation.spec.ts`

- [ ] E2E Test: User views gallery and navigates carousel
  - **Path**: `e2e/gallery.spec.ts`
  - **Acceptance Criteria**:
    - Test: Gallery section visible on page
    - Test: Click next button advances carousel
    - Test: Click prev button goes back
    - Test: Click dot navigation jumps to specific slide
    - Test: Keyboard arrow keys navigate carousel
  - **Test**: Run `npx playwright test gallery.spec.ts`

- [ ] E2E Test: User opens FAQ accordion items
  - **Path**: `e2e/faq.spec.ts`
  - **Acceptance Criteria**:
    - Test: Click question expands answer
    - Test: Click again collapses answer
    - Test: Multiple FAQs can be opened (or only one, depending on design)
    - Test: Keyboard navigation works (Tab, Enter)
  - **Test**: Run `npx playwright test faq.spec.ts`

- [ ] E2E Test: User fills and submits contact form
  - **Path**: `e2e/contact-form.spec.ts`
  - **Acceptance Criteria**:
    - Test: Fill all required fields
    - Test: Submit form successfully
    - Test: Success message appears
    - Test: Form validation prevents invalid submission
    - Test: Error messages display for invalid fields
  - **Test**: Run `npx playwright test contact-form.spec.ts`

- [ ] E2E Test: User views footer contact info
  - **Path**: `e2e/footer.spec.ts`
  - **Acceptance Criteria**:
    - Test: Footer visible at bottom of page
    - Test: Phone number (+34) 638 94 39 62 clickable
    - Test: Email link functional
    - Test: All footer links present
  - **Test**: Run `npx playwright test footer.spec.ts`

### 14.5 Lighthouse Performance Audit

- [ ] Run Lighthouse audit for performance
  - **Test Method**: Chrome DevTools Lighthouse OR Playwright Lighthouse integration
  - **Acceptance Criteria**:
    - Performance score: 95+ (target 100)
    - Accessibility score: 95+ (target 100)
    - Best Practices score: 95+
    - SEO score: 95+
    - LCP (Largest Contentful Paint): <2.5s
    - FID (First Input Delay): <100ms
    - CLS (Cumulative Layout Shift): <0.1
  - **Test**: Run Lighthouse on production build, generate report

### 14.6 Cross-Browser Testing

- [ ] Test on real mobile devices (iOS Safari, Android Chrome)
  - **Test Method**: Use BrowserStack, real devices, or Playwright mobile emulation
  - **Acceptance Criteria**:
    - Site loads correctly on iPhone (iOS Safari)
    - Site loads correctly on Android (Chrome)
    - Touch interactions work (carousel swipe, form inputs)
    - No layout issues on small screens (320px width)
  - **Test**: Test on physical devices or emulators

- [ ] Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
  - **Test Method**: Manual testing or Playwright multi-browser config
  - **Acceptance Criteria**:
    - Site renders correctly in Chrome
    - Site renders correctly in Firefox
    - Site renders correctly in Safari (Mac/iOS)
    - Site renders correctly in Edge
    - No CSS bugs or layout issues
    - All JavaScript functionality works
  - **Test**: Open site in each browser, verify visual and functional consistency

### 14.7 Test Coverage Report

- [ ] Generate test coverage report
  - **Command**: `npm run test:coverage`
  - **Acceptance Criteria**:
    - Unit test coverage > 80% (target 90%+)
    - All critical components have tests
    - E2E tests cover main user flows
  - **Test**: Review coverage report, identify untested code

---

## Section 15: Performance Optimization

### 15.1 CSS Optimization

- [ ] Audit and optimize CSS (remove unused rules)
  - **Method**: Use PurgeCSS or manual review
  - **Acceptance Criteria**:
    - No unused CSS classes in production build
    - CSS file size minimized
    - Critical CSS identified (if needed)
  - **Test**: Build project, analyze CSS bundle size in dist/

- [ ] Implement Critical CSS (if needed)
  - **Method**: Inline critical CSS in <head>, defer rest
  - **Acceptance Criteria**:
    - Above-the-fold content styled with inline CSS
    - Non-critical CSS loaded asynchronously
    - Faster First Contentful Paint (FCP)
  - **Test**: Run Lighthouse, check FCP improvement

- [ ] Minify CSS in production build
  - **Path**: `astro.config.mjs`
  - **Acceptance Criteria**:
    - CSS automatically minified in build
    - Astro default build process handles minification
  - **Test**: Build project, verify CSS files minified in dist/

### 15.2 Image Optimization

- [ ] Optimize images with srcset and sizes attributes
  - **Method**: Use Astro Image component (already implemented)
  - **Acceptance Criteria**:
    - All images use responsive srcset
    - Sizes attribute matches layout breakpoints
    - Modern formats (WebP/AVIF) served
  - **Test**: Check Network tab, verify correct image size loaded

- [ ] Implement lazy loading strategy
  - **Acceptance Criteria**:
    - Hero image: `loading="eager"`
    - All other images: `loading="lazy"`
    - Lazy images load when scrolled into view
  - **Test**: Scroll page, verify images load progressively

### 15.3 Core Web Vitals Testing

- [ ] Test Core Web Vitals (LCP, FID, CLS)
  - **Test Method**: Lighthouse + PageSpeed Insights + Real User Monitoring
  - **Acceptance Criteria**:
    - **LCP (Largest Contentful Paint)**: <2.5s (Good)
    - **FID (First Input Delay)**: <100ms (Good)
    - **CLS (Cumulative Layout Shift)**: <0.1 (Good)
  - **Test**: Run Lighthouse, check Core Web Vitals scores

- [ ] Optimize for Core Web Vitals if needed
  - **LCP optimization**: Optimize hero image, use preload for critical resources
  - **FID optimization**: Minimize JavaScript execution time, use code splitting
  - **CLS optimization**: Add width/height to images, avoid layout shifts from fonts
  - **Test**: Re-run Lighthouse after optimizations, verify improvements

### 15.4 Build Optimization

- [ ] Test production build output
  - **Command**: `npm run build`
  - **Acceptance Criteria**:
    - Build completes without errors or warnings
    - CSS minified and optimized
    - Images compressed and in modern formats
    - JavaScript bundled and minimized
    - HTML minified (if enabled)
  - **Test**: Inspect dist/ directory, check file sizes

- [ ] Analyze bundle size
  - **Method**: Check dist/ directory file sizes
  - **Acceptance Criteria**:
    - CSS bundle < 50KB (gzipped)
    - JavaScript bundle < 100KB (gzipped)
    - Individual images < 300KB
    - Total page weight < 1MB
  - **Test**: Use tools like webpack-bundle-analyzer or manual inspection

---

## Section 16: Build and Deployment

### 16.1 Vercel Configuration

- [ ] Create vercel.json configuration
  - **Path**: `vercel.json`
  - **Acceptance Criteria**:
    ```json
    {
      "buildCommand": "npm run build",
      "outputDirectory": "dist",
      "devCommand": "npm run dev",
      "framework": "astro",
      "rewrites": [
        {
          "source": "/(.*)",
          "destination": "/$1"
        }
      ],
      "headers": [
        {
          "source": "/(.*)",
          "headers": [
            {
              "key": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "key": "X-Frame-Options",
              "value": "DENY"
            },
            {
              "key": "X-XSS-Protection",
              "value": "1; mode=block"
            }
          ]
        },
        {
          "source": "/(.*)\\.(jpg|jpeg|png|webp|avif|gif|svg|ico)",
          "headers": [
            {
              "key": "Cache-Control",
              "value": "public, max-age=31536000, immutable"
            }
          ]
        }
      ]
    }
    ```
  - **Test**: Verify configuration valid JSON

- [ ] Install @astrojs/vercel adapter
  - **Command**: `npm install @astrojs/vercel` (already done in Section 1.1)
  - **Acceptance Criteria**: Package in dependencies
  - **Test**: Check package.json

- [ ] Configure astro.config.mjs for Vercel
  - **Path**: `astro.config.mjs` (already configured in Section 1.2)
  - **Acceptance Criteria**:
    - Vercel adapter configured
    - Output mode set to 'server' or 'static'
    - Compression enabled
  - **Test**: Build project and verify Vercel build succeeds

### 16.2 Environment Variables for Production

- [ ] Set up environment variables for production
  - **Method**: Configure in Vercel dashboard
  - **Acceptance Criteria**:
    - SITE_URL set to production domain
    - CONTACT_EMAIL set
    - PHONE_NUMBER: (+34) 638 94 39 62
    - Any API keys (if needed) configured
  - **Test**: Deploy to Vercel, verify environment variables accessible

### 16.3 Production Build Testing

- [ ] Test production build completes successfully
  - **Command**: `npm run build`
  - **Acceptance Criteria**:
    - Build completes with no errors
    - No warnings that indicate issues
    - dist/ directory generated with all assets
    - All pages rendered correctly
  - **Test**: Run build command, inspect output

- [ ] Test production build locally
  - **Command**: `npm run preview` (or `npx astro preview`)
  - **Acceptance Criteria**:
    - Production build serves correctly on localhost
    - All pages accessible
    - All assets load correctly
    - No console errors
  - **Test**: Open localhost preview, navigate through site

---

## Final Checklist Summary

**Total Tasks**: 140+ granular, actionable tasks

**Estimated Timeline**:
- Setup and Base CSS System: 1-2 days
- Components (Header, Hero, Services, Gallery, FAQ, Contact, Footer): 4-6 days
- Images, SEO, Accessibility: 2-3 days
- Comprehensive Testing (Unit + E2E + Accessibility + Performance): 3-4 days
- Build, Deployment, Final QA: 1-2 days

**Total Estimated Time**: 11-17 days (depending on complexity and testing rigor)

---

## Usage Instructions

1. **Start at Section 1** - Complete tasks in order, checking off each as you finish
2. **Don't skip testing tasks** - Each component MUST be tested before moving to the next
3. **Mobile-first is mandatory** - All CSS must start with mobile base styles
4. **Accessibility is non-negotiable** - Every component must be keyboard accessible and screen-reader friendly
5. **Document any deviations** - If you change approaches, document why
6. **Run all tests before deployment** - Section 14 tests must pass 100%

---

## Success Criteria

- [ ] All 140+ tasks completed and checked off
- [ ] Zero accessibility violations (axe-core scan)
- [ ] Lighthouse scores: 95+ on all metrics (Performance, Accessibility, Best Practices, SEO)
- [ ] All E2E tests pass
- [ ] Cross-browser compatible (Chrome, Firefox, Safari, Edge)
- [ ] Mobile-responsive from 320px to 2560px+
- [ ] Production build deploys successfully to Vercel
- [ ] Core Web Vitals in "Good" range (LCP <2.5s, FID <100ms, CLS <0.1)

---

**Remember**: This is a professional website migration. Quality over speed. Every task matters. Test everything. Mobile-first always.
