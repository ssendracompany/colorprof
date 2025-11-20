# Backend & Infrastructure Implementation Checklist

**Project**: Professional Painter Website Migration (WordPress → Astro + Vercel)
**Tech Stack**: Astro (Static Site), Vercel (Hosting + Serverless Functions), Vercel Forms
**Goal**: Production-ready backend infrastructure with optimal performance, security, and maintainability

---

## Section 1: Project Structure & Configuration

### 1.1 Astro Project Configuration
- [ ] Set up Astro project configuration
  - **File**: `astro.config.mjs`
  - **Tasks**:
    - Set `output: 'static'` for static site generation
    - Install and configure `@astrojs/vercel` adapter
    - Enable image optimization with `@astrojs/image`
    - Configure build output directory to `dist`
    - Set `site` property to production domain URL
    - Enable compression and minification
  - **Acceptance Criteria**:
    - Configuration file exists and is valid
    - Vercel adapter properly configured
    - Image optimization enabled
  - **Test**: Run `npm run build` - should complete without errors

### 1.2 TypeScript Configuration
- [ ] Configure TypeScript for strict type safety
  - **File**: `tsconfig.json`
  - **Tasks**:
    - Enable strict mode (`"strict": true`)
    - Configure path aliases:
      - `@/*` → `./src/*`
      - `@components/*` → `./src/components/*`
      - `@layouts/*` → `./src/layouts/*`
      - `@data/*` → `./src/data/*`
      - `@utils/*` → `./src/utils/*`
    - Set target to ES2022 or higher
    - Enable `moduleResolution: "bundler"`
    - Add `types: ["astro/client"]`
  - **Acceptance Criteria**:
    - TypeScript compiles without errors
    - Path aliases work in imports
    - Strict mode catches type errors
  - **Test**: Run `npx tsc --noEmit` - should pass

### 1.3 Environment Variables Setup
- [ ] Create environment variables template
  - **File**: `.env.local.example`
  - **Content**:
    ```
    # Base URL of the website (required for sitemap and canonical URLs)
    SITE_URL=https://yourpaintersite.com

    # Vercel Forms (automatically set by Vercel)
    # VERCEL_ENV=production

    # Future API integrations (optional)
    # VITE_API_BASE=https://api.example.com

    # Email configuration (for Vercel Forms)
    CONTACT_EMAIL=info@yourpaintersite.com

    # Google Analytics (optional)
    # PUBLIC_GA_ID=G-XXXXXXXXXX
    ```
  - **Acceptance Criteria**:
    - All required variables documented
    - Example values provided
    - Comments explain purpose
  - **Test**: Copy to `.env.local` and verify app reads variables

### 1.4 Git Configuration
- [ ] Set up .gitignore appropriately
  - **File**: `.gitignore`
  - **Content**:
    ```
    # Environment files
    .env
    .env.local
    .env.production

    # Dependencies
    node_modules/

    # Build output
    dist/
    .astro/

    # OS files
    .DS_Store
    Thumbs.db

    # IDE files
    .vscode/
    .idea/
    *.swp
    *.swo

    # Logs
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
    pnpm-debug.log*

    # Vercel
    .vercel
    ```
  - **Acceptance Criteria**:
    - Sensitive files ignored
    - Build artifacts ignored
    - `.env.local.example` NOT ignored
  - **Test**: Run `git status` - no sensitive files shown

### 1.5 Validation
- [ ] Verify project structure and configuration
  - **Tests**:
    - Run `npm run build` - completes successfully
    - Run `npm run dev` - starts development server
    - Check TypeScript compilation - no errors
    - Verify environment variables load correctly
  - **Acceptance Criteria**:
    - All configuration files valid
    - No build errors or warnings
    - Development server starts on http://localhost:4321

---

## Section 2: Vercel Configuration & Deployment

### 2.1 Vercel Configuration File
- [ ] Create Vercel configuration
  - **File**: `vercel.json`
  - **Content**:
    ```json
    {
      "buildCommand": "npm run build",
      "outputDirectory": "dist",
      "framework": "astro",
      "headers": [
        {
          "source": "/assets/(.*)",
          "headers": [
            {
              "key": "Cache-Control",
              "value": "public, max-age=31536000, immutable"
            }
          ]
        },
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
            },
            {
              "key": "Referrer-Policy",
              "value": "strict-origin-when-cross-origin"
            }
          ]
        }
      ],
      "rewrites": [
        {
          "source": "/sitemap.xml",
          "destination": "/sitemap.xml"
        }
      ]
    }
    ```
  - **Acceptance Criteria**:
    - Build configuration correct
    - Security headers configured
    - Caching headers optimized
  - **Test**: Validate JSON syntax, deploy to Vercel

### 2.2 Vercel Adapter Installation
- [ ] Install and configure Vercel adapter
  - **Tasks**:
    - Run `npm install @astrojs/vercel`
    - Update `astro.config.mjs`:
      ```javascript
      import { defineConfig } from 'astro/config';
      import vercel from '@astrojs/vercel/static';

      export default defineConfig({
        output: 'static',
        adapter: vercel(),
        // ... other config
      });
      ```
    - Configure static route handling
  - **Acceptance Criteria**:
    - Adapter installed successfully
    - Astro config updated
    - Build output compatible with Vercel
  - **Test**: Run `npm run build` - generates Vercel-compatible output

### 2.3 Vercel Environment Variables
- [ ] Configure environment variables in Vercel dashboard
  - **Location**: Vercel Project Settings → Environment Variables
  - **Variables to add**:
    - `SITE_URL` → Production domain (e.g., https://yourpaintersite.com)
    - `CONTACT_EMAIL` → Email for form submissions
    - `PUBLIC_GA_ID` → Google Analytics ID (if used)
  - **Acceptance Criteria**:
    - All required variables set for Production
    - All required variables set for Preview
    - All required variables set for Development
  - **Test**: Deploy and verify variables accessible in build logs

### 2.4 Custom Domain Configuration
- [ ] Configure DNS for custom domain
  - **Tasks**:
    - Add domain in Vercel dashboard
    - Configure DNS records:
      - **Option A**: Vercel nameservers (recommended)
      - **Option B**: CNAME record pointing to `cname.vercel-dns.com`
    - Add A records for root domain if using CNAME workaround
    - Configure www subdomain (redirect to root or vice versa)
  - **Acceptance Criteria**:
    - Domain points to Vercel
    - SSL certificate auto-provisioned
    - Both www and non-www work correctly
  - **Test**: Visit domain - site loads with HTTPS

### 2.5 HTTPS & SSL Configuration
- [ ] Enable HTTPS and automatic SSL certificates
  - **Tasks**:
    - Verify SSL certificate auto-generated by Vercel
    - Enable "Always Redirect to HTTPS" in Vercel settings
    - Add HSTS header (already in vercel.json headers)
    - Test SSL Labs rating (aim for A+)
  - **Acceptance Criteria**:
    - HTTPS enabled for all domains
    - HTTP redirects to HTTPS
    - SSL certificate valid and trusted
  - **Test**: Visit http://domain.com - redirects to https://

### 2.6 Deployment Verification
- [ ] Test complete Vercel deployment
  - **Tests**:
    - Deploy to Vercel (first deployment)
    - Verify all pages load correctly
    - Check all assets (images, CSS, JS) load
    - Verify custom domain resolves
    - Test mobile responsiveness
    - Check browser console for errors
  - **Acceptance Criteria**:
    - Deployment succeeds without errors
    - All pages accessible via custom domain
    - No 404 errors or missing assets
  - **Test**: Full site navigation works on production URL

---

## Section 3: Static Content & Data Management

### 3.1 Content Directory Structure
- [ ] Create content directory structure
  - **Directories to create**:
    - `src/data/` - Root data directory
    - `src/data/services/` - Service definitions
    - `src/data/portfolio/` - Portfolio/gallery items
    - `src/data/company/` - Company information
  - **Files to create**:
    - `src/data/services.json` - Painting services
    - `src/data/faq.json` - FAQ items
    - `src/data/portfolio.json` - Project gallery
    - `src/data/company-info.json` - Contact details, hours
  - **Acceptance Criteria**:
    - Directory structure matches design
    - All JSON files created
    - Files follow consistent naming convention
  - **Test**: Run `tree src/data` - verify structure

### 3.2 Service Data Schema
- [ ] Populate services.json with painter business data
  - **File**: `src/data/services.json`
  - **Example Structure**:
    ```json
    [
      {
        "id": "interior-painting",
        "title": "Pintura de Interiores",
        "titleEn": "Interior Painting",
        "description": "Renovamos el interior de tu hogar con acabados profesionales",
        "descriptionEn": "We renovate your home's interior with professional finishes",
        "icon": "paint-brush",
        "features": [
          "Preparación de superficies",
          "Pinturas ecológicas disponibles",
          "Acabados mate, satinado o brillante"
        ],
        "featuresEn": [
          "Surface preparation",
          "Eco-friendly paints available",
          "Matte, satin or gloss finishes"
        ],
        "priceRange": "$$",
        "featured": true
      }
    ]
    ```
  - **Acceptance Criteria**:
    - At least 5-7 services defined
    - Bilingual content (Spanish/English)
    - All fields populated
    - Valid JSON syntax
  - **Test**: Parse JSON successfully, validate structure

### 3.3 Portfolio Data Schema
- [ ] Populate portfolio.json with project examples
  - **File**: `src/data/portfolio.json`
  - **Example Structure**:
    ```json
    [
      {
        "id": "project-001",
        "title": "Reforma Integral - Vivienda en Barcelona",
        "titleEn": "Complete Renovation - Barcelona Home",
        "category": "interior",
        "description": "Pintura completa de vivienda de 120m²",
        "descriptionEn": "Complete painting of 120m² home",
        "images": [
          {
            "src": "/images/portfolio/project-001-before.jpg",
            "alt": "Antes de la renovación",
            "type": "before"
          },
          {
            "src": "/images/portfolio/project-001-after.jpg",
            "alt": "Después de la renovación",
            "type": "after"
          }
        ],
        "date": "2024-03-15",
        "featured": true
      }
    ]
    ```
  - **Acceptance Criteria**:
    - At least 8-12 portfolio items
    - Before/after images for each project
    - Categories defined (interior, exterior, decorative)
    - Valid JSON syntax
  - **Test**: Load portfolio data in component successfully

### 3.4 FAQ Data Schema
- [ ] Populate faq.json with common painting questions
  - **File**: `src/data/faq.json`
  - **Example Structure**:
    ```json
    [
      {
        "id": "faq-001",
        "question": "¿Cuánto tiempo tarda un proyecto típico?",
        "questionEn": "How long does a typical project take?",
        "answer": "Depende del tamaño, pero una vivienda de 80-100m² suele tardar entre 3-5 días.",
        "answerEn": "It depends on size, but an 80-100m² home typically takes 3-5 days.",
        "category": "timeline",
        "order": 1
      }
    ]
    ```
  - **Acceptance Criteria**:
    - At least 10-15 FAQ items
    - Categories: timeline, pricing, process, materials
    - Bilingual content
    - Ordered for display priority
  - **Test**: FAQ renders correctly on page

### 3.5 Company Information Schema
- [ ] Populate company-info.json with business details
  - **File**: `src/data/company-info.json`
  - **Example Structure**:
    ```json
    {
      "name": "Tu Nombre - Pintor Profesional",
      "nameEn": "Your Name - Professional Painter",
      "phone": "+34 638 94 39 62",
      "email": "info@yourpaintersite.com",
      "address": {
        "street": "Calle Ejemplo, 123",
        "city": "Barcelona",
        "region": "Cataluña",
        "postalCode": "08001",
        "country": "España"
      },
      "hours": {
        "weekdays": "Lunes - Viernes: 8:00 - 18:00",
        "weekdaysEn": "Monday - Friday: 8:00 AM - 6:00 PM",
        "saturday": "Sábados: 9:00 - 14:00",
        "saturdayEn": "Saturday: 9:00 AM - 2:00 PM",
        "sunday": "Cerrado",
        "sundayEn": "Closed"
      },
      "social": {
        "facebook": "https://facebook.com/yourpage",
        "instagram": "https://instagram.com/yourpage",
        "linkedin": "https://linkedin.com/in/yourprofile"
      },
      "description": "Pintor profesional con más de 15 años de experiencia",
      "descriptionEn": "Professional painter with over 15 years of experience"
    }
    ```
  - **Acceptance Criteria**:
    - All contact details accurate
    - Phone number formatted correctly
    - Social media links valid
    - Bilingual content
  - **Test**: Contact information displays correctly on site

### 3.6 TypeScript Type Definitions
- [ ] Create TypeScript types/interfaces for data structures
  - **File**: `src/types/data.ts`
  - **Content**:
    ```typescript
    export interface Service {
      id: string;
      title: string;
      titleEn: string;
      description: string;
      descriptionEn: string;
      icon: string;
      features: string[];
      featuresEn: string[];
      priceRange: '$' | '$$' | '$$$';
      featured: boolean;
    }

    export interface PortfolioImage {
      src: string;
      alt: string;
      type: 'before' | 'after' | 'detail';
    }

    export interface PortfolioItem {
      id: string;
      title: string;
      titleEn: string;
      category: 'interior' | 'exterior' | 'decorative';
      description: string;
      descriptionEn: string;
      images: PortfolioImage[];
      date: string;
      featured: boolean;
    }

    export interface FAQItem {
      id: string;
      question: string;
      questionEn: string;
      answer: string;
      answerEn: string;
      category: string;
      order: number;
    }

    export interface Address {
      street: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
    }

    export interface CompanyInfo {
      name: string;
      nameEn: string;
      phone: string;
      email: string;
      address: Address;
      hours: Record<string, string>;
      social: Record<string, string>;
      description: string;
      descriptionEn: string;
    }
    ```
  - **Acceptance Criteria**:
    - All data structures typed
    - Types export correctly
    - Enums used for constrained values
  - **Test**: Import types in components without errors

### 3.7 Data Loader Utilities
- [ ] Implement data loaders and utilities
  - **File**: `src/utils/data-loader.ts`
  - **Content**:
    ```typescript
    import type { Service, PortfolioItem, FAQItem, CompanyInfo } from '@/types/data';

    export async function loadServices(): Promise<Service[]> {
      const data = await import('@/data/services.json');
      return data.default;
    }

    export async function loadPortfolio(): Promise<PortfolioItem[]> {
      const data = await import('@/data/portfolio.json');
      return data.default;
    }

    export async function loadFAQ(): Promise<FAQItem[]> {
      const data = await import('@/data/faq.json');
      return data.default;
    }

    export async function loadCompanyInfo(): Promise<CompanyInfo> {
      const data = await import('@/data/company-info.json');
      return data.default;
    }

    export function getFeaturedServices(services: Service[]): Service[] {
      return services.filter(s => s.featured);
    }

    export function getFeaturedPortfolio(portfolio: PortfolioItem[]): PortfolioItem[] {
      return portfolio.filter(p => p.featured);
    }

    export function getFAQByCategory(faq: FAQItem[], category: string): FAQItem[] {
      return faq
        .filter(item => item.category === category)
        .sort((a, b) => a.order - b.order);
    }
    ```
  - **Acceptance Criteria**:
    - All data loaders implemented
    - Helper functions for filtering/sorting
    - Type-safe return values
  - **Test**: Call loaders in Astro pages successfully

### 3.8 Data Validation
- [ ] Verify data loads correctly and validates
  - **Tests**:
    - Load each JSON file - no parse errors
    - Validate structure matches TypeScript types
    - Check all required fields present
    - Verify no runtime errors when accessing data
    - Test helper functions return expected results
  - **Acceptance Criteria**:
    - All JSON valid
    - TypeScript compilation succeeds
    - Data renders on pages correctly
  - **Test**: Build site - no data loading errors

---

## Section 4: Static File Generation (SEO)

### 4.1 Sitemap Generation
- [ ] Create sitemap.xml generation
  - **File**: `src/pages/sitemap.xml.ts`
  - **Content**:
    ```typescript
    import type { APIRoute } from 'astro';
    import { loadPortfolio } from '@/utils/data-loader';

    const SITE_URL = import.meta.env.SITE_URL || 'https://yourpaintersite.com';

    export const GET: APIRoute = async () => {
      const portfolio = await loadPortfolio();

      const staticPages = [
        '',
        '/servicios',
        '/servicios/interior',
        '/servicios/exterior',
        '/servicios/decorativo',
        '/portfolio',
        '/sobre-mi',
        '/contacto',
        '/faq',
        '/en',
        '/en/services',
        '/en/portfolio',
        '/en/about',
        '/en/contact',
        '/en/faq',
      ];

      const portfolioPages = portfolio.map(item => `/portfolio/${item.id}`);

      const allPages = [...staticPages, ...portfolioPages];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages.map(page => `
      <url>
        <loc>${SITE_URL}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
        <priority>${page === '' ? '1.0' : '0.8'}</priority>
      </url>`).join('')}
    </urlset>`;

      return new Response(sitemap, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    };
    ```
  - **Acceptance Criteria**:
    - All main pages included
    - Dynamic portfolio pages included
    - Valid XML format
    - Proper lastmod dates
  - **Test**: Visit /sitemap.xml - valid XML loads

### 4.2 Robots.txt Configuration
- [ ] Create robots.txt file
  - **File**: `public/robots.txt`
  - **Content**:
    ```
    User-agent: *
    Allow: /

    Sitemap: https://yourpaintersite.com/sitemap.xml

    # Disallow future admin paths if added
    # Disallow: /admin/
    # Disallow: /api/
    ```
  - **Acceptance Criteria**:
    - Allows all crawlers
    - Points to sitemap
    - Future-proof for admin areas
  - **Test**: Visit /robots.txt - file loads correctly

### 4.3 RSS Feed (Optional Enhancement)
- [ ] Create RSS feed for blog/news updates
  - **File**: `src/pages/rss.xml.ts`
  - **Tasks**:
    - Create RSS feed template
    - Include recent blog posts (if blog added)
    - Include portfolio updates
    - Set proper MIME type
  - **Acceptance Criteria**:
    - Valid RSS 2.0 format
    - Includes recent content
    - Validates in RSS validator
  - **Test**: Visit /rss.xml - feed validates
  - **Note**: Optional - implement if blog/news section added

### 4.4 Canonical URLs Implementation
- [ ] Implement canonical URLs for all pages
  - **File**: `src/layouts/BaseLayout.astro`
  - **Tasks**:
    - Add canonical meta tag to head
    - Use `Astro.url.pathname` for current page
    - Ensure absolute URLs
    - Handle trailing slashes consistently
  - **Example**:
    ```astro
    ---
    const canonicalURL = new URL(Astro.url.pathname, Astro.site);
    ---
    <head>
      <link rel="canonical" href={canonicalURL.href} />
      <!-- other head content -->
    </head>
    ```
  - **Acceptance Criteria**:
    - All pages have canonical tag
    - URLs are absolute (not relative)
    - No duplicate content issues
  - **Test**: View page source - canonical tag present

### 4.5 Structured Data (Schema.org)
- [ ] Add structured data for SEO
  - **File**: `src/components/StructuredData.astro`
  - **Tasks**:
    - Add LocalBusiness schema
    - Add Service schema for each service
    - Add Organization schema
    - Add BreadcrumbList schema
  - **Example**:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Tu Nombre - Pintor Profesional",
      "image": "https://yourpaintersite.com/images/logo.png",
      "telephone": "+34 638 94 39 62",
      "email": "info@yourpaintersite.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Ejemplo, 123",
        "addressLocality": "Barcelona",
        "postalCode": "08001",
        "addressCountry": "ES"
      },
      "priceRange": "$$",
      "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-14:00"
    }
    ```
  - **Acceptance Criteria**:
    - Valid JSON-LD format
    - All required fields populated
    - Validates in Google Rich Results Test
  - **Test**: Test with Google Rich Results Test tool

### 4.6 SEO Validation
- [ ] Test sitemap, robots.txt, canonical URLs, structured data
  - **Tests**:
    - Validate sitemap.xml with XML validator
    - Verify robots.txt accessible and correct
    - Check canonical URLs on all pages
    - Test structured data with Google Rich Results
    - Verify no duplicate content issues
    - Test with Lighthouse SEO audit
  - **Acceptance Criteria**:
    - Sitemap valid XML, all pages included
    - Robots.txt accessible
    - Canonical tags present on all pages
    - Structured data validates
    - Lighthouse SEO score 95+
  - **Test**: Run Lighthouse audit - SEO score 95+

---

## Section 5: Contact Form & Form Handling (Vercel Forms)

### 5.1 Vercel Forms Integration
- [ ] Set up Vercel Forms integration
  - **File**: `src/components/ContactForm.astro`
  - **Tasks**:
    - Create HTML form with proper attributes
    - Set `action` to form endpoint (Vercel auto-detects)
    - Set `method="POST"`
    - Add `data-netlify="true"` (compatibility) or rely on Vercel auto-detection
    - Add hidden form name field
  - **Example**:
    ```html
    <form method="POST" action="/api/contact" name="contact">
      <input type="hidden" name="form-name" value="contact" />
      <!-- form fields -->
    </form>
    ```
  - **Acceptance Criteria**:
    - Form submits to Vercel endpoint
    - Vercel detects form automatically
    - Form data captured in Vercel dashboard
  - **Test**: Submit test form - appears in Vercel Forms dashboard

### 5.2 Vercel Forms Email Forwarding
- [ ] Configure Vercel Forms email notifications
  - **Location**: Vercel Dashboard → Project → Forms → Notifications
  - **Tasks**:
    - Set email recipient (use CONTACT_EMAIL env var)
    - Configure email template
    - Test email delivery
    - Set up backup notification method (Slack/webhook optional)
  - **Acceptance Criteria**:
    - Email notifications configured
    - Test email received successfully
    - Email contains all form fields
  - **Test**: Submit form - email received with correct data

### 5.3 Form Field Validation (Client-Side)
- [ ] Create client-side HTML5 validation
  - **File**: `src/components/ContactForm.astro`
  - **Tasks**:
    - Add `required` attributes to mandatory fields
    - Add `type="email"` for email field
    - Add `type="tel"` with pattern for phone
    - Add `minlength` and `maxlength` where appropriate
    - Add custom validation messages
  - **Example**:
    ```html
    <input
      type="text"
      name="name"
      required
      minlength="2"
      maxlength="100"
      aria-label="Nombre completo"
      placeholder="Juan Pérez"
    />
    <input
      type="email"
      name="email"
      required
      aria-label="Email"
      placeholder="juan@example.com"
    />
    <input
      type="tel"
      name="phone"
      required
      pattern="[+]?[0-9\s\-()]+"
      aria-label="Teléfono"
      placeholder="+34 638 94 39 62"
    />
    ```
  - **Acceptance Criteria**:
    - All required fields validated
    - Email format validated
    - Phone format validated
    - User-friendly error messages
  - **Test**: Try submitting invalid data - validation prevents submission

### 5.4 Server-Side Form Handling
- [ ] Create serverless function for form processing
  - **File**: `src/pages/api/contact.ts`
  - **Content**:
    ```typescript
    import type { APIRoute } from 'astro';

    export const POST: APIRoute = async ({ request }) => {
      try {
        const formData = await request.formData();
        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString();
        const phone = formData.get('phone')?.toString();
        const service = formData.get('service')?.toString();
        const message = formData.get('message')?.toString();

        // Validation
        if (!name || !email || !message) {
          return new Response(JSON.stringify({
            success: false,
            error: 'Campos requeridos faltantes'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return new Response(JSON.stringify({
            success: false,
            error: 'Email inválido'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Store submission (Vercel automatically stores form submissions)
        // Or integrate with email service (SendGrid, Resend, etc.)

        return new Response(JSON.stringify({
          success: true,
          message: 'Mensaje enviado correctamente'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Form submission error:', error);
        return new Response(JSON.stringify({
          success: false,
          error: 'Error del servidor'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    };
    ```
  - **Acceptance Criteria**:
    - Server-side validation implemented
    - Error handling for invalid data
    - Success/error responses in JSON
  - **Test**: Submit form - proper response received

### 5.5 Form Success/Error Handling
- [ ] Create form feedback UI
  - **File**: `src/scripts/contact-form.ts`
  - **Tasks**:
    - Add client-side JavaScript for form submission
    - Show loading state during submission
    - Display success message on success
    - Display error message on failure
    - Clear form on success
    - Accessibility: announce status to screen readers
  - **Example**:
    ```typescript
    const form = document.querySelector('form[name="contact"]');
    const submitButton = form?.querySelector('button[type="submit"]');

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitButton?.setAttribute('disabled', 'true');
      submitButton.textContent = 'Enviando...';

      const formData = new FormData(form as HTMLFormElement);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          showSuccessMessage('¡Mensaje enviado! Te contactaremos pronto.');
          form.reset();
        } else {
          showErrorMessage(result.error || 'Error al enviar mensaje');
        }
      } catch (error) {
        showErrorMessage('Error de conexión. Inténtalo de nuevo.');
      } finally {
        submitButton?.removeAttribute('disabled');
        submitButton.textContent = 'Enviar mensaje';
      }
    });
    ```
  - **Acceptance Criteria**:
    - Loading state shown during submission
    - Success message displayed on success
    - Error message displayed on failure
    - Form cleared after successful submission
    - Button disabled during submission
  - **Test**: Submit form - proper feedback shown

### 5.6 Spam Protection
- [ ] Implement honeypot field for spam protection
  - **File**: `src/components/ContactForm.astro`
  - **Tasks**:
    - Add hidden honeypot field
    - Style honeypot to be invisible but not display:none
    - Check honeypot on server-side
    - Reject submission if honeypot filled
  - **Example**:
    ```html
    <div style="position: absolute; left: -9999px;">
      <label for="website">Website (leave blank)</label>
      <input type="text" name="website" id="website" tabindex="-1" autocomplete="off" />
    </div>
    ```
  - **Server-side check**:
    ```typescript
    const honeypot = formData.get('website')?.toString();
    if (honeypot) {
      // Likely spam, reject silently
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    ```
  - **Acceptance Criteria**:
    - Honeypot field invisible to users
    - Bots likely to fill honeypot
    - Server rejects spam submissions
  - **Test**: Fill honeypot manually - submission rejected (silently)
  - **Note**: Alternative: Add reCAPTCHA v3 for more robust protection

### 5.7 Form Testing & Validation
- [ ] Test complete form submission flow
  - **Tests**:
    - Submit valid form - success message shown
    - Submit invalid email - validation error shown
    - Submit without required fields - validation error
    - Submit with honeypot filled - silently rejected
    - Check email received with correct data
    - Test on mobile devices
    - Test with screen reader
  - **Acceptance Criteria**:
    - All validations work correctly
    - Email notifications received
    - User feedback clear and helpful
    - Accessible to all users
  - **Test**: Complete end-to-end form submission successful

---

## Section 6: Build Optimization & Performance

### 6.1 Astro Build Configuration
- [ ] Configure Astro build optimization settings
  - **File**: `astro.config.mjs`
  - **Tasks**:
    - Enable compression (`compressHTML: true`)
    - Enable minification for HTML, CSS, JS
    - Configure tree shaking
    - Enable code splitting
    - Configure prefetch strategy
  - **Example**:
    ```javascript
    export default defineConfig({
      output: 'static',
      compressHTML: true,
      build: {
        inlineStylesheets: 'auto',
      },
      vite: {
        build: {
          minify: 'esbuild',
          cssMinify: true,
          rollupOptions: {
            output: {
              manualChunks: undefined,
            },
          },
        },
      },
    });
    ```
  - **Acceptance Criteria**:
    - HTML compressed
    - CSS minified
    - JavaScript minified
    - Code splitting enabled
  - **Test**: Run build - output files minified

### 6.2 Image Optimization Pipeline
- [ ] Set up asset optimization pipeline
  - **Tasks**:
    - Install `@astrojs/image` or use built-in Image component
    - Configure image formats (WebP, AVIF)
    - Set up responsive images
    - Configure lazy loading
    - Optimize image quality settings
  - **Example**:
    ```astro
    ---
    import { Image } from 'astro:assets';
    import heroImage from '@/assets/hero.jpg';
    ---

    <Image
      src={heroImage}
      alt="Professional painting services"
      width={1200}
      height={800}
      format="webp"
      quality={80}
      loading="lazy"
    />
    ```
  - **Acceptance Criteria**:
    - Images converted to WebP/AVIF
    - Responsive sizes generated
    - Lazy loading enabled
    - Images optimized for web
  - **Test**: Check build output - optimized images generated

### 6.3 CSS Optimization
- [ ] Optimize CSS delivery
  - **Tasks**:
    - Enable CSS minification
    - Remove unused CSS
    - Inline critical CSS
    - Defer non-critical CSS
    - Use CSS modules or scoped styles
  - **Acceptance Criteria**:
    - CSS files minified
    - No unused CSS in production
    - Critical CSS inlined in HTML
    - Lighthouse audit: eliminate render-blocking CSS
  - **Test**: Lighthouse audit - no CSS blocking render

### 6.4 JavaScript Optimization
- [ ] Optimize JavaScript delivery
  - **Tasks**:
    - Enable JavaScript minification
    - Code split large bundles
    - Defer non-critical scripts
    - Use dynamic imports for heavy features
    - Remove console logs in production
  - **Acceptance Criteria**:
    - JavaScript minified
    - Code split appropriately
    - No console logs in production build
    - Lighthouse audit: no blocking scripts
  - **Test**: Build output - JS files optimized

### 6.5 Caching Headers Configuration
- [ ] Configure caching headers in Vercel
  - **File**: `vercel.json` (update existing)
  - **Tasks**:
    - Set long cache for static assets (1 year)
    - Set short cache for HTML pages (1 hour)
    - Set no-cache for API responses
    - Configure ETags
  - **Example**:
    ```json
    {
      "headers": [
        {
          "source": "/assets/(.*)",
          "headers": [
            {
              "key": "Cache-Control",
              "value": "public, max-age=31536000, immutable"
            }
          ]
        },
        {
          "source": "/(.*)\\.html",
          "headers": [
            {
              "key": "Cache-Control",
              "value": "public, max-age=3600, must-revalidate"
            }
          ]
        },
        {
          "source": "/api/(.*)",
          "headers": [
            {
              "key": "Cache-Control",
              "value": "no-cache, no-store, must-revalidate"
            }
          ]
        }
      ]
    }
    ```
  - **Acceptance Criteria**:
    - Static assets cached for 1 year
    - HTML cached for 1 hour
    - API responses not cached
  - **Test**: Check response headers - caching configured correctly

### 6.6 Security Headers Configuration
- [ ] Implement security headers in Vercel config
  - **File**: `vercel.json` (update existing)
  - **Tasks**:
    - Add X-Content-Type-Options: nosniff
    - Add X-Frame-Options: DENY
    - Add X-XSS-Protection: 1; mode=block
    - Add Referrer-Policy: strict-origin-when-cross-origin
    - Add Content-Security-Policy (CSP)
    - Add Strict-Transport-Security (HSTS)
  - **Example CSP**:
    ```json
    {
      "key": "Content-Security-Policy",
      "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
    }
    ```
  - **Acceptance Criteria**:
    - All security headers configured
    - CSP allows necessary resources
    - HSTS enforces HTTPS
    - No security warnings in browser console
  - **Test**: Check headers with securityheaders.com - A rating

### 6.7 Build Performance Testing
- [ ] Test build output optimization
  - **Tests**:
    - Run `npm run build` - completes successfully
    - Check dist/ folder size - under 5MB (excluding images)
    - Verify all assets minified
    - Check Lighthouse Performance score - 95+
    - Verify Core Web Vitals passing
    - Test page load speed - under 2 seconds
  - **Acceptance Criteria**:
    - Build completes without errors
    - Output optimized and small
    - Lighthouse Performance 95+
    - Core Web Vitals: all green
  - **Test**: Run Lighthouse audit - all scores 95+

---

## Section 7: Development Environment Setup

### 7.1 NPM Scripts Configuration
- [ ] Create comprehensive npm scripts
  - **File**: `package.json`
  - **Scripts to add**:
    ```json
    {
      "scripts": {
        "dev": "astro dev",
        "build": "astro build",
        "preview": "astro preview",
        "lint": "eslint . --ext .js,.jsx,.ts,.tsx,.astro",
        "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx,.astro --fix",
        "format": "prettier --write \"**/*.{js,jsx,ts,tsx,astro,json,css,md}\"",
        "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,astro,json,css,md}\"",
        "type-check": "tsc --noEmit",
        "test": "vitest run",
        "test:watch": "vitest",
        "test:e2e": "playwright test",
        "test:e2e:debug": "playwright test --ui",
        "test:lighthouse": "lhci autorun",
        "clean": "rm -rf dist .astro node_modules/.vite"
      }
    }
    ```
  - **Acceptance Criteria**:
    - All scripts defined
    - Scripts work correctly
    - Clear naming convention
  - **Test**: Run each script - works as expected

### 7.2 Development Environment File
- [ ] Document development environment variables
  - **File**: `.env.local.example` (already created in Section 1.3)
  - **Tasks**:
    - Ensure all variables documented
    - Add comments explaining each variable
    - Provide example values
    - Document how to obtain API keys (if needed)
  - **Acceptance Criteria**:
    - All environment variables listed
    - Clear explanations provided
    - Easy for new developers to set up
  - **Test**: New developer can set up .env.local from example

### 7.3 VSCode Settings (Optional)
- [ ] Create VSCode workspace settings
  - **File**: `.vscode/settings.json`
  - **Content**:
    ```json
    {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "[astro]": {
        "editor.defaultFormatter": "astro-build.astro-vscode"
      },
      "files.associations": {
        "*.astro": "astro"
      },
      "typescript.tsdk": "node_modules/typescript/lib",
      "typescript.enablePromptUseWorkspaceTsdk": true
    }
    ```
  - **File**: `.vscode/extensions.json`
  - **Content**:
    ```json
    {
      "recommendations": [
        "astro-build.astro-vscode",
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint",
        "bradlc.vscode-tailwindcss"
      ]
    }
    ```
  - **Acceptance Criteria**:
    - Format on save enabled
    - Astro extension recommended
    - TypeScript configured
  - **Test**: Open project in VSCode - extensions recommended

### 7.4 Contributing Guidelines
- [ ] Create contributing guidelines
  - **File**: `CONTRIBUTING.md`
  - **Content**:
    ```markdown
    # Contributing to Painter Website

    ## Setup

    1. Clone the repository
    2. Install dependencies: `npm install`
    3. Copy environment file: `cp .env.local.example .env.local`
    4. Edit `.env.local` with your values
    5. Start dev server: `npm run dev`

    ## Development Workflow

    1. Create feature branch: `git checkout -b feature/your-feature`
    2. Make changes
    3. Run tests: `npm test`
    4. Format code: `npm run format`
    5. Commit with descriptive message
    6. Push and create PR

    ## Code Style

    - Use Prettier for formatting (runs on save)
    - Follow ESLint rules
    - Write TypeScript types for all data
    - Use semantic HTML
    - Ensure accessibility (ARIA labels, alt text)

    ## Testing

    - Write unit tests for utilities
    - Write E2E tests for critical user flows
    - Run Lighthouse audit before deploying
    - Test on multiple browsers

    ## Deployment

    - Pushes to `main` auto-deploy to production
    - Preview deployments created for all PRs
    - Check Vercel deployment status
    ```
  - **Acceptance Criteria**:
    - Clear setup instructions
    - Workflow documented
    - Code style guidelines defined
  - **Test**: New contributor can follow guide successfully

### 7.5 Development Server Testing
- [ ] Test development environment
  - **Tests**:
    - Run `npm run dev` - starts on localhost:4321
    - Hot module replacement works
    - Changes reflect immediately
    - TypeScript errors shown in terminal
    - No console errors in browser
  - **Acceptance Criteria**:
    - Dev server starts successfully
    - HMR works correctly
    - Good developer experience
  - **Test**: Make change - auto-reloads in browser

---

## Section 8: Code Quality & Linting (Recommended)

### 8.1 ESLint Installation & Configuration
- [ ] Install ESLint and configure for Astro
  - **Install**:
    ```bash
    npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-astro
    ```
  - **File**: `.eslintrc.cjs`
  - **Content**:
    ```javascript
    module.exports = {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:astro/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      overrides: [
        {
          files: ['*.astro'],
          parser: 'astro-eslint-parser',
          parserOptions: {
            parser: '@typescript-eslint/parser',
            extraFileExtensions: ['.astro'],
          },
        },
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    };
    ```
  - **Acceptance Criteria**:
    - ESLint installed
    - Configuration valid
    - Lints TypeScript and Astro files
  - **Test**: Run `npm run lint` - no errors

### 8.2 Prettier Installation & Configuration
- [ ] Install Prettier and configure
  - **Install**:
    ```bash
    npm install -D prettier prettier-plugin-astro
    ```
  - **File**: `.prettierrc`
  - **Content**:
    ```json
    {
      "semi": true,
      "singleQuote": true,
      "tabWidth": 2,
      "trailingComma": "es5",
      "printWidth": 100,
      "plugins": ["prettier-plugin-astro"],
      "overrides": [
        {
          "files": "*.astro",
          "options": {
            "parser": "astro"
          }
        }
      ]
    }
    ```
  - **File**: `.prettierignore`
  - **Content**:
    ```
    dist/
    .astro/
    node_modules/
    package-lock.json
    pnpm-lock.yaml
    yarn.lock
    ```
  - **Acceptance Criteria**:
    - Prettier installed
    - Configuration valid
    - Formats Astro files correctly
  - **Test**: Run `npm run format` - code formatted

### 8.3 Pre-commit Hooks (Husky + lint-staged)
- [ ] Configure pre-commit hooks
  - **Install**:
    ```bash
    npm install -D husky lint-staged
    npx husky init
    ```
  - **File**: `.husky/pre-commit`
  - **Content**:
    ```bash
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"

    npx lint-staged
    ```
  - **File**: `package.json` (add lint-staged config)
  - **Content**:
    ```json
    {
      "lint-staged": {
        "*.{js,jsx,ts,tsx,astro}": [
          "eslint --fix",
          "prettier --write"
        ],
        "*.{json,css,md}": [
          "prettier --write"
        ]
      }
    }
    ```
  - **Acceptance Criteria**:
    - Husky installed
    - Pre-commit hook runs lint-staged
    - Automatically fixes and formats files
  - **Test**: Make commit - hook runs successfully

### 8.4 Code Quality Testing
- [ ] Test linting and formatting
  - **Tests**:
    - Run `npm run lint` - checks for errors
    - Run `npm run lint:fix` - fixes auto-fixable issues
    - Run `npm run format` - formats all files
    - Run `npm run format:check` - checks formatting
    - Make commit - pre-commit hook runs
  - **Acceptance Criteria**:
    - All linting passes
    - All files formatted
    - Pre-commit hook works
  - **Test**: Run all linting/formatting commands successfully

---

## Section 9: Testing Infrastructure (MANDATORY)

### 9.1 Vitest Setup for Unit Testing
- [ ] Install and configure Vitest
  - **Install**:
    ```bash
    npm install -D vitest @vitest/ui @testing-library/dom happy-dom
    ```
  - **File**: `vitest.config.ts`
  - **Content**:
    ```typescript
    import { defineConfig } from 'vitest/config';
    import { resolve } from 'path';

    export default defineConfig({
      test: {
        globals: true,
        environment: 'happy-dom',
        include: ['**/*.test.ts', '**/*.spec.ts'],
        exclude: ['node_modules', 'dist', '.astro', '**/*.e2e.test.ts'],
        coverage: {
          provider: 'v8',
          reporter: ['text', 'json', 'html'],
          exclude: [
            'node_modules/',
            'dist/',
            '.astro/',
            '**/*.config.*',
            '**/*.d.ts',
          ],
        },
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
          '@components': resolve(__dirname, './src/components'),
          '@layouts': resolve(__dirname, './src/layouts'),
          '@data': resolve(__dirname, './src/data'),
          '@utils': resolve(__dirname, './src/utils'),
        },
      },
    });
    ```
  - **Acceptance Criteria**:
    - Vitest installed and configured
    - Path aliases work in tests
    - Test environment set to happy-dom
  - **Test**: Run `npm test` - Vitest executes

### 9.2 Example Unit Tests
- [ ] Create example unit tests
  - **File**: `src/utils/data-loader.test.ts`
  - **Content**:
    ```typescript
    import { describe, it, expect } from 'vitest';
    import { getFeaturedServices, getFeaturedPortfolio } from './data-loader';
    import type { Service, PortfolioItem } from '@/types/data';

    describe('data-loader utils', () => {
      it('should filter featured services', () => {
        const services: Service[] = [
          { id: '1', featured: true, /* ... */ } as Service,
          { id: '2', featured: false, /* ... */ } as Service,
        ];

        const featured = getFeaturedServices(services);
        expect(featured).toHaveLength(1);
        expect(featured[0].id).toBe('1');
      });

      it('should filter featured portfolio items', () => {
        const portfolio: PortfolioItem[] = [
          { id: '1', featured: true, /* ... */ } as PortfolioItem,
          { id: '2', featured: true, /* ... */ } as PortfolioItem,
          { id: '3', featured: false, /* ... */ } as PortfolioItem,
        ];

        const featured = getFeaturedPortfolio(portfolio);
        expect(featured).toHaveLength(2);
      });
    });
    ```
  - **Acceptance Criteria**:
    - Test file created
    - Tests pass
    - Good code coverage
  - **Test**: Run `npm test` - tests pass

### 9.3 Playwright Setup for E2E Testing
- [ ] Install and configure Playwright
  - **Install**:
    ```bash
    npm install -D @playwright/test
    npx playwright install
    ```
  - **File**: `playwright.config.ts`
  - **Content**:
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
        screenshot: 'only-on-failure',
      },
      projects: [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        },
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'] },
        },
        {
          name: 'Mobile Chrome',
          use: { ...devices['Pixel 5'] },
        },
        {
          name: 'Mobile Safari',
          use: { ...devices['iPhone 12'] },
        },
      ],
      webServer: {
        command: 'npm run preview',
        url: 'http://localhost:4321',
        reuseExistingServer: !process.env.CI,
      },
    });
    ```
  - **Acceptance Criteria**:
    - Playwright installed
    - Multi-browser testing configured
    - Mobile testing configured
  - **Test**: Run `npm run test:e2e` - Playwright executes

### 9.4 Example E2E Tests
- [ ] Create example E2E tests
  - **File**: `e2e/contact-form.spec.ts`
  - **Content**:
    ```typescript
    import { test, expect } from '@playwright/test';

    test.describe('Contact Form', () => {
      test('should submit form successfully', async ({ page }) => {
        await page.goto('/contacto');

        // Fill form
        await page.fill('input[name="name"]', 'Juan Pérez');
        await page.fill('input[name="email"]', 'juan@example.com');
        await page.fill('input[name="phone"]', '+34 638 94 39 62');
        await page.selectOption('select[name="service"]', 'interior-painting');
        await page.fill('textarea[name="message"]', 'Me gustaría solicitar un presupuesto');

        // Submit
        await page.click('button[type="submit"]');

        // Verify success
        await expect(page.locator('.success-message')).toBeVisible();
        await expect(page.locator('.success-message')).toContainText('Mensaje enviado');
      });

      test('should show validation errors for invalid email', async ({ page }) => {
        await page.goto('/contacto');

        await page.fill('input[name="email"]', 'invalid-email');
        await page.click('button[type="submit"]');

        // Verify validation error
        const emailInput = page.locator('input[name="email"]');
        await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      });
    });
    ```
  - **Acceptance Criteria**:
    - E2E tests created for critical flows
    - Tests cover form submission
    - Tests cover validation
  - **Test**: Run `npm run test:e2e` - tests pass

### 9.5 Accessibility Testing Setup
- [ ] Set up accessibility testing with axe-core
  - **Install**:
    ```bash
    npm install -D @axe-core/playwright
    ```
  - **File**: `e2e/accessibility.spec.ts`
  - **Content**:
    ```typescript
    import { test, expect } from '@playwright/test';
    import AxeBuilder from '@axe-core/playwright';

    test.describe('Accessibility', () => {
      test('homepage should not have accessibility violations', async ({ page }) => {
        await page.goto('/');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });

      test('contact page should not have accessibility violations', async ({ page }) => {
        await page.goto('/contacto');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
    ```
  - **Acceptance Criteria**:
    - Axe-core installed
    - Accessibility tests created
    - WCAG 2.1 AA compliance tested
  - **Test**: Run accessibility tests - no violations

### 9.6 Lighthouse CI Setup
- [ ] Configure Lighthouse CI
  - **Install**:
    ```bash
    npm install -D @lhci/cli
    ```
  - **File**: `.lighthouserc.json`
  - **Content**:
    ```json
    {
      "ci": {
        "collect": {
          "url": [
            "http://localhost:4321/",
            "http://localhost:4321/servicios",
            "http://localhost:4321/portfolio",
            "http://localhost:4321/contacto"
          ],
          "startServerCommand": "npm run preview",
          "numberOfRuns": 3
        },
        "assert": {
          "assertions": {
            "categories:performance": ["error", { "minScore": 0.95 }],
            "categories:accessibility": ["error", { "minScore": 0.95 }],
            "categories:best-practices": ["error", { "minScore": 0.95 }],
            "categories:seo": ["error", { "minScore": 0.95 }]
          }
        },
        "upload": {
          "target": "temporary-public-storage"
        }
      }
    }
    ```
  - **Acceptance Criteria**:
    - Lighthouse CI installed
    - Thresholds set (95+ for all categories)
    - Multiple pages tested
  - **Test**: Run `npm run test:lighthouse` - all thresholds pass

### 9.7 Test Scripts Configuration
- [ ] Update package.json with test scripts
  - **File**: `package.json` (update scripts section)
  - **Scripts**:
    ```json
    {
      "scripts": {
        "test": "vitest run",
        "test:watch": "vitest",
        "test:ui": "vitest --ui",
        "test:coverage": "vitest run --coverage",
        "test:e2e": "playwright test",
        "test:e2e:debug": "playwright test --ui",
        "test:e2e:report": "playwright show-report",
        "test:lighthouse": "lhci autorun",
        "test:all": "npm test && npm run test:e2e && npm run test:lighthouse"
      }
    }
    ```
  - **Acceptance Criteria**:
    - All test scripts defined
    - Scripts work correctly
    - test:all runs full test suite
  - **Test**: Run `npm run test:all` - all tests pass

### 9.8 Testing Infrastructure Validation
- [ ] Verify all testing frameworks configured
  - **Tests**:
    - Run `npm test` - unit tests pass
    - Run `npm run test:e2e` - E2E tests pass
    - Run `npm run test:lighthouse` - Lighthouse audit passes
    - Run accessibility tests - no violations
    - Check test coverage - aim for 80%+
  - **Acceptance Criteria**:
    - All test frameworks operational
    - Tests pass consistently
    - Good test coverage
    - CI/CD ready
  - **Test**: Run full test suite successfully

---

## Section 10: CI/CD Pipeline (GitHub Actions)

### 10.1 GitHub Actions Workflow for Testing
- [ ] Create GitHub Actions workflow for automated testing
  - **File**: `.github/workflows/ci.yml`
  - **Content**:
    ```yaml
    name: CI

    on:
      push:
        branches: [main, develop]
      pull_request:
        branches: [main, develop]

    jobs:
      test:
        runs-on: ubuntu-latest

        steps:
          - uses: actions/checkout@v4

          - name: Setup Node.js
            uses: actions/setup-node@v4
            with:
              node-version: '20'
              cache: 'npm'

          - name: Install dependencies
            run: npm ci

          - name: Run linter
            run: npm run lint

          - name: Type check
            run: npm run type-check

          - name: Run unit tests
            run: npm test

          - name: Build project
            run: npm run build

          - name: Install Playwright browsers
            run: npx playwright install --with-deps

          - name: Run E2E tests
            run: npm run test:e2e

          - name: Upload Playwright report
            if: failure()
            uses: actions/upload-artifact@v4
            with:
              name: playwright-report
              path: playwright-report/

          - name: Run Lighthouse CI
            run: npm run test:lighthouse
            env:
              LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
    ```
  - **Acceptance Criteria**:
    - Workflow runs on push and PR
    - All tests executed
    - Build verification included
  - **Test**: Push to GitHub - workflow runs successfully

### 10.2 Vercel Deployment Configuration
- [ ] Configure automatic deployment on Vercel
  - **Location**: Vercel Dashboard → Project Settings → Git
  - **Tasks**:
    - Link GitHub repository to Vercel project
    - Enable automatic deployments on push to main
    - Configure preview deployments for pull requests
    - Set production branch to `main`
    - Configure ignored build step (optional)
  - **Acceptance Criteria**:
    - GitHub repo linked
    - Auto-deploy on push to main enabled
    - Preview deployments for PRs enabled
  - **Test**: Push to main - auto-deploys to production

### 10.3 Pull Request Status Checks
- [ ] Add status checks for pull requests
  - **Location**: GitHub Settings → Branches → Branch protection rules
  - **Tasks**:
    - Require status checks before merging
    - Require CI workflow to pass
    - Require Lighthouse checks to pass
    - Require at least 1 review
    - Enforce on administrators
  - **Acceptance Criteria**:
    - Status checks required
    - Build must succeed to merge
    - Tests must pass to merge
  - **Test**: Create PR - status checks run

### 10.4 Deployment Workflow Testing
- [ ] Test complete CI/CD pipeline
  - **Tests**:
    - Create feature branch
    - Make changes
    - Push to GitHub
    - Verify CI workflow runs
    - Create PR
    - Verify preview deployment created
    - Verify status checks pass
    - Merge PR
    - Verify production deployment
  - **Acceptance Criteria**:
    - CI runs on every push
    - Preview deployments work
    - Production deploys on merge
    - All status checks pass
  - **Test**: Complete PR flow - deploys successfully

---

## Section 11: Monitoring & Analytics (Optional)

### 11.1 Vercel Web Analytics
- [ ] Set up Vercel Analytics
  - **Location**: Vercel Dashboard → Project → Analytics
  - **Tasks**:
    - Enable Web Analytics
    - Add analytics script to layout
    - Configure privacy settings
    - Set up custom events (form submissions)
  - **File**: `src/layouts/BaseLayout.astro`
  - **Add**:
    ```astro
    ---
    import { Analytics } from '@vercel/analytics';
    ---
    <html>
      <head>
        <!-- other head content -->
      </head>
      <body>
        <slot />
        <Analytics />
      </body>
    </html>
    ```
  - **Acceptance Criteria**:
    - Analytics enabled
    - Tracking script added
    - Dashboard shows data
  - **Test**: Visit site - analytics dashboard shows visitors

### 11.2 Google Analytics (Optional)
- [ ] Configure Google Analytics 4
  - **Tasks**:
    - Create GA4 property
    - Get measurement ID
    - Add to environment variables
    - Add tracking script to layout
  - **File**: `src/layouts/BaseLayout.astro`
  - **Add**:
    ```astro
    ---
    const gaId = import.meta.env.PUBLIC_GA_ID;
    ---
    <head>
      {gaId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
          <script is:inline define:vars={{ gaId }}>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', gaId);
          </script>
        </>
      )}
    </head>
    ```
  - **Acceptance Criteria**:
    - GA4 property created
    - Tracking code added
    - Events tracked
  - **Test**: Visit site - GA4 shows real-time visitors

### 11.3 Error Tracking (Optional - Sentry)
- [ ] Set up Sentry for error monitoring
  - **Install**:
    ```bash
    npm install @sentry/astro
    ```
  - **File**: `astro.config.mjs`
  - **Add**:
    ```javascript
    import sentry from '@sentry/astro';

    export default defineConfig({
      integrations: [
        sentry({
          dsn: process.env.SENTRY_DSN,
          environment: process.env.VERCEL_ENV || 'development',
          release: process.env.VERCEL_GIT_COMMIT_SHA,
        }),
      ],
    });
    ```
  - **Acceptance Criteria**:
    - Sentry installed
    - DSN configured
    - Errors captured and reported
  - **Test**: Trigger error - appears in Sentry dashboard

### 11.4 Uptime Monitoring (Optional)
- [ ] Set up uptime monitoring
  - **Options**:
    - UptimeRobot (free tier)
    - Pingdom
    - StatusCake
    - Vercel monitoring (built-in)
  - **Tasks**:
    - Create uptime monitor
    - Set check interval (5 minutes)
    - Configure alert notifications (email/SMS)
    - Monitor critical pages (homepage, contact)
  - **Acceptance Criteria**:
    - Uptime monitor active
    - Alerts configured
    - Dashboard accessible
  - **Test**: Monitor shows site online

### 11.5 Monitoring Dashboard Validation
- [ ] Verify all monitoring systems operational
  - **Tests**:
    - Check Vercel Analytics - shows visitor data
    - Check Google Analytics - tracks events
    - Check Sentry - no critical errors
    - Check uptime monitor - site online
    - Test alert notifications
  - **Acceptance Criteria**:
    - All monitoring active
    - Data flowing correctly
    - Alerts configured
  - **Test**: All dashboards show correct data

---

## Section 12: Documentation

### 12.1 README.md
- [ ] Create comprehensive README
  - **File**: `README.md`
  - **Content**:
    ```markdown
    # Professional Painter Website

    Modern, fast, and SEO-optimized website for a professional painting business.
    Built with Astro and deployed on Vercel.

    ## Tech Stack

    - **Framework**: Astro (Static Site Generator)
    - **Hosting**: Vercel
    - **Styling**: Tailwind CSS (or your choice)
    - **Forms**: Vercel Forms
    - **Language**: TypeScript
    - **Testing**: Vitest, Playwright, Lighthouse CI

    ## Features

    - Static site generation for optimal performance
    - Bilingual support (Spanish/English)
    - Contact form with email notifications
    - Portfolio/gallery with before/after images
    - Service pages
    - FAQ section
    - SEO optimized (sitemap, structured data)
    - Lighthouse score 95+
    - Mobile responsive
    - Accessibility compliant (WCAG 2.1 AA)

    ## Quick Start

    ```bash
    # Clone repository
    git clone <repository-url>

    # Install dependencies
    npm install

    # Copy environment file
    cp .env.local.example .env.local

    # Edit .env.local with your values

    # Start development server
    npm run dev
    ```

    Visit http://localhost:4321

    ## Commands

    | Command | Description |
    |---------|-------------|
    | `npm run dev` | Start development server |
    | `npm run build` | Build for production |
    | `npm run preview` | Preview production build |
    | `npm test` | Run unit tests |
    | `npm run test:e2e` | Run E2E tests |
    | `npm run lint` | Lint code |
    | `npm run format` | Format code |

    ## Environment Variables

    See `.env.local.example` for required variables.

    ## Contributing

    See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

    ## License

    Proprietary - All rights reserved
    ```
  - **Acceptance Criteria**:
    - Clear project overview
    - Setup instructions complete
    - Commands documented
  - **Test**: New developer can set up project from README

### 12.2 DEPLOYMENT.md
- [ ] Create deployment documentation
  - **File**: `DEPLOYMENT.md`
  - **Content**:
    ```markdown
    # Deployment Guide

    ## Vercel Deployment

    ### Initial Setup

    1. Create Vercel account at vercel.com
    2. Install Vercel CLI: `npm i -g vercel`
    3. Link project: `vercel link`

    ### Deploy to Production

    ```bash
    # Deploy to production
    vercel --prod
    ```

    ### Automatic Deployments

    Pushes to `main` branch automatically deploy to production.
    Pull requests create preview deployments.

    ### Environment Variables

    Set in Vercel Dashboard → Project → Settings → Environment Variables:

    - `SITE_URL` - Production domain URL
    - `CONTACT_EMAIL` - Email for form submissions
    - `PUBLIC_GA_ID` - Google Analytics ID (optional)

    ### Custom Domain

    1. Go to Vercel Dashboard → Project → Settings → Domains
    2. Add your custom domain
    3. Configure DNS:
       - **Option A**: Use Vercel nameservers (recommended)
       - **Option B**: Add CNAME record: `cname.vercel-dns.com`
    4. Wait for SSL certificate provisioning (automatic)

    ### Troubleshooting

    **Build fails**:
    - Check build logs in Vercel dashboard
    - Verify environment variables set
    - Test build locally: `npm run build`

    **404 errors**:
    - Verify routing in vercel.json
    - Check file paths are correct

    **Slow performance**:
    - Run Lighthouse audit
    - Check asset sizes
    - Verify caching headers

    ## Rollback

    In Vercel Dashboard:
    1. Go to Deployments
    2. Find previous working deployment
    3. Click "..." menu → Promote to Production
    ```
  - **Acceptance Criteria**:
    - Step-by-step deployment guide
    - Troubleshooting section
    - Rollback procedure documented
  - **Test**: Follow guide - successful deployment

### 12.3 ARCHITECTURE.md
- [ ] Create architecture documentation
  - **File**: `ARCHITECTURE.md`
  - **Content**:
    ```markdown
    # Architecture Documentation

    ## Overview

    This website follows a static site generation approach with Astro,
    optimized for performance and SEO.

    ## Project Structure

    ```
    /
    ├── public/              # Static assets
    │   ├── images/          # Images
    │   ├── fonts/           # Fonts
    │   └── robots.txt       # Robots file
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── layouts/         # Page layouts
    │   ├── pages/           # Routes
    │   │   ├── index.astro  # Homepage
    │   │   ├── servicios/   # Services pages
    │   │   ├── portfolio/   # Portfolio pages
    │   │   └── api/         # API endpoints
    │   ├── data/            # Static content
    │   │   ├── services.json
    │   │   ├── portfolio.json
    │   │   └── faq.json
    │   ├── utils/           # Utility functions
    │   ├── types/           # TypeScript types
    │   └── scripts/         # Client-side scripts
    ├── e2e/                 # E2E tests
    ├── astro.config.mjs     # Astro config
    ├── vercel.json          # Vercel config
    └── package.json
    ```

    ## Design Decisions

    ### Static Site Generation

    **Why**: Best performance, SEO, and simplicity for content that doesn't change frequently.

    Content is generated at build time, resulting in:
    - Fast page loads (pre-rendered HTML)
    - Excellent SEO (crawlable content)
    - Low server costs (static hosting)

    ### Vercel Forms

    **Why**: Serverless form handling without database complexity.

    Forms are submitted to Vercel's built-in form handling:
    - No backend needed for MVP
    - Email notifications automatic
    - Spam protection included

    ### TypeScript

    **Why**: Type safety prevents bugs and improves maintainability.

    All data structures are typed:
    - Compile-time error detection
    - Better IDE autocomplete
    - Safer refactoring

    ### JSON Data Files

    **Why**: Simple content management without CMS overhead.

    Content stored in JSON:
    - Easy to edit
    - Version controlled
    - Type-safe with TypeScript

    ## Data Flow

    1. Build time: JSON data loaded and validated
    2. Static pages generated with data
    3. Deployed to Vercel CDN
    4. User visits page → served from CDN
    5. Contact form submission → Vercel Forms → Email notification

    ## Security

    - All pages served over HTTPS
    - Security headers configured (CSP, HSTS, etc.)
    - Form submissions validated server-side
    - No sensitive data in client-side code

    ## Future Extensibility

    ### Adding a CMS

    To add content management:
    1. Integrate headless CMS (Sanity, Contentful)
    2. Fetch content at build time
    3. Trigger rebuild on content changes (webhooks)

    ### Adding a Blog

    To add blog functionality:
    1. Create `/blog` directory in `/src/pages`
    2. Use Content Collections for blog posts
    3. Update sitemap generation
    4. Update RSS feed

    ### Adding User Authentication

    To add user accounts:
    1. Switch to hybrid rendering mode
    2. Add authentication provider (Auth.js)
    3. Add database (PostgreSQL on Vercel)
    4. Implement protected routes
    ```
  - **Acceptance Criteria**:
    - Architecture clearly explained
    - Design decisions justified
    - Future extensibility documented
  - **Test**: Document is clear and helpful

### 12.4 API.md (If Applicable)
- [ ] Document API endpoints
  - **File**: `API.md`
  - **Content**:
    ```markdown
    # API Documentation

    ## Endpoints

    ### POST /api/contact

    Submit contact form.

    **Request Body**:
    ```json
    {
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "phone": "+34 638 94 39 62",
      "service": "interior-painting",
      "message": "Me gustaría solicitar un presupuesto"
    }
    ```

    **Validation**:
    - `name`: required, 2-100 characters
    - `email`: required, valid email format
    - `phone`: required, valid phone format
    - `service`: optional, one of service IDs
    - `message`: required, 10-1000 characters

    **Success Response** (200):
    ```json
    {
      "success": true,
      "message": "Mensaje enviado correctamente"
    }
    ```

    **Error Response** (400):
    ```json
    {
      "success": false,
      "error": "Email inválido"
    }
    ```

    **Error Response** (500):
    ```json
    {
      "success": false,
      "error": "Error del servidor"
    }
    ```

    ### GET /sitemap.xml

    Returns XML sitemap for SEO.

    **Response**: XML document with all site URLs.

    ### GET /rss.xml

    Returns RSS feed (if blog implemented).

    **Response**: XML document with recent posts.
    ```
  - **Acceptance Criteria**:
    - All endpoints documented
    - Request/response formats shown
    - Validation rules listed
  - **Test**: API documentation is accurate

### 12.5 Documentation Validation
- [ ] Test documentation accuracy
  - **Tests**:
    - Follow README setup - works correctly
    - Follow DEPLOYMENT.md - deploys successfully
    - Review ARCHITECTURE.md - accurate and clear
    - Check API.md - endpoints work as documented
    - New developer reviews docs - finds them helpful
  - **Acceptance Criteria**:
    - All documentation accurate
    - No outdated information
    - Clear and helpful
  - **Test**: Documentation review completed

---

## Section 13: Testing & Quality Assurance (COMPREHENSIVE)

### 13.1 Build Process Verification
- [ ] Verify complete build process
  - **Tests**:
    - Run `npm run build` - completes without errors
    - Check build output in `dist/` folder
    - Verify all pages generated
    - Verify all assets copied
    - Check build size (should be optimized)
    - No TypeScript errors
    - No console warnings
  - **Acceptance Criteria**:
    - Build succeeds consistently
    - Output folder contains all necessary files
    - No errors or warnings in build log
  - **Test**: Run `npm run build` multiple times - always succeeds

### 13.2 Local Development Verification
- [ ] Verify local development environment
  - **Tests**:
    - Run `npm run dev` - starts on localhost:4321
    - Make change to component - hot reload works
    - Make change to data file - rebuild triggered
    - TypeScript errors shown in terminal
    - Browser console shows no errors
    - All pages accessible in dev mode
  - **Acceptance Criteria**:
    - Dev server starts reliably
    - Hot module replacement works
    - Good developer experience
    - Fast rebuild times
  - **Test**: Dev environment works smoothly

### 13.3 Production Build Verification
- [ ] Verify production build quality
  - **Tests**:
    - Run `npm run build` then `npm run preview`
    - Verify all pages load correctly
    - Check all assets load (images, CSS, JS)
    - Test navigation between pages
    - Verify forms work
    - Check mobile responsiveness
    - Test in multiple browsers
  - **Acceptance Criteria**:
    - Production build works identically to dev
    - No broken links
    - All assets load
    - Mobile responsive
  - **Test**: Preview production build - everything works

### 13.4 Lighthouse Audit
- [ ] Run comprehensive Lighthouse audits
  - **Tests**:
    - Run Lighthouse on homepage
    - Run Lighthouse on services page
    - Run Lighthouse on portfolio page
    - Run Lighthouse on contact page
    - Test mobile and desktop
  - **Targets**:
    - Performance: 95+
    - Accessibility: 95+
    - Best Practices: 95+
    - SEO: 95+
  - **Acceptance Criteria**:
    - All pages score 95+ in all categories
    - Core Web Vitals passing
    - No critical accessibility issues
  - **Test**: Run `npm run test:lighthouse` - all pass

### 13.5 Cross-Browser Testing
- [ ] Test across multiple browsers
  - **Browsers to test**:
    - Chrome (latest)
    - Firefox (latest)
    - Safari (latest)
    - Edge (latest)
  - **Mobile devices**:
    - iOS Safari
    - Android Chrome
  - **Tests**:
    - All pages load correctly
    - Navigation works
    - Forms submit successfully
    - Images display correctly
    - No console errors
  - **Acceptance Criteria**:
    - Works consistently across all browsers
    - No browser-specific bugs
    - Mobile experience excellent
  - **Test**: Manual testing on all platforms

### 13.6 Vercel Deployment Testing
- [ ] Test complete Vercel deployment
  - **Tests**:
    - Deploy to Vercel staging/preview
    - Verify all pages accessible via domain
    - Test form submissions work
    - Verify email notifications received
    - Check custom domain works
    - Verify HTTPS enabled
    - Test security headers present
    - Check caching headers correct
  - **Acceptance Criteria**:
    - Deployment succeeds without errors
    - All functionality works on production
    - No 404 errors
    - Forms deliver emails
  - **Test**: Full end-to-end production test

### 13.7 Performance Testing
- [ ] Test website performance
  - **Tests**:
    - Measure page load time (aim: < 2 seconds)
    - Test Core Web Vitals:
      - LCP (Largest Contentful Paint) < 2.5s
      - FID (First Input Delay) < 100ms
      - CLS (Cumulative Layout Shift) < 0.1
    - Test on slow 3G connection
    - Check asset sizes
    - Verify compression enabled
  - **Acceptance Criteria**:
    - Page loads under 2 seconds
    - Core Web Vitals passing
    - Works on slow connections
  - **Test**: WebPageTest or Lighthouse performance audit

### 13.8 Production Readiness Checklist
- [ ] Verify production readiness
  - **Critical Checks**:
    - [ ] All environment variables set in Vercel
    - [ ] Custom domain configured and working
    - [ ] SSL certificate active
    - [ ] Forms submit and deliver emails
    - [ ] All pages load without errors
    - [ ] Lighthouse scores 95+
    - [ ] Cross-browser compatibility verified
    - [ ] Mobile responsiveness tested
    - [ ] Accessibility compliant
    - [ ] SEO optimized (sitemap, structured data)
    - [ ] Security headers configured
    - [ ] Monitoring/analytics enabled
    - [ ] Error tracking configured (if applicable)
    - [ ] Documentation complete
  - **Acceptance Criteria**:
    - All checks passing
    - Ready for production traffic
  - **Test**: Final production readiness review

---

## Section 14: Post-Launch Monitoring

### 14.1 Monitoring Dashboard Setup
- [ ] Set up comprehensive monitoring
  - **Tools**:
    - Vercel Analytics dashboard
    - Google Analytics (if configured)
    - Error tracking dashboard (Sentry if configured)
    - Uptime monitor dashboard
  - **Metrics to monitor**:
    - Page views
    - Unique visitors
    - Form submissions
    - Error rate
    - Page load times
    - Uptime percentage
  - **Acceptance Criteria**:
    - All monitoring tools configured
    - Dashboards accessible
    - Data flowing correctly
  - **Test**: Check all dashboards show data

### 14.2 Incident Response Plan
- [ ] Create incident response plan
  - **Document**:
    - Contact procedure if issues found
    - Rollback procedure (Vercel deployment)
    - Emergency contacts
    - Communication plan (notify stakeholders)
  - **Common Issues**:
    - Site down → Check Vercel status, rollback if needed
    - Forms not working → Check Vercel Forms config
    - Slow performance → Check Vercel analytics, review assets
  - **Acceptance Criteria**:
    - Response plan documented
    - Team knows procedures
    - Contact information current
  - **Test**: Simulate incident - response plan followed

### 14.3 Regular Maintenance Plan
- [ ] Plan regular maintenance schedule
  - **Monthly**:
    - Review analytics data
    - Check form submissions
    - Review error logs
    - Monitor performance metrics
    - Check uptime reports
  - **Quarterly**:
    - Update dependencies (`npm update`)
    - Run security audit (`npm audit`)
    - Review and update content
    - Re-run Lighthouse audits
    - Review and improve SEO
  - **Annually**:
    - Comprehensive audit (security, performance, accessibility)
    - Review architecture and infrastructure
    - Plan new features or improvements
  - **Acceptance Criteria**:
    - Maintenance schedule defined
    - Responsible parties assigned
    - Calendar reminders set
  - **Test**: First maintenance cycle completed

### 14.4 Post-Launch Validation
- [ ] Verify post-launch monitoring operational
  - **Tests**:
    - Check monitoring systems active
    - Verify alerts configured and working
    - Test incident response procedure
    - Review first week of analytics data
    - Confirm regular maintenance scheduled
  - **Acceptance Criteria**:
    - All monitoring operational
    - Alerts working
    - Team prepared for incidents
    - Maintenance plan in place
  - **Test**: Post-launch review completed

---

## Final Checklist

### Pre-Deployment
- [ ] All sections 1-12 completed
- [ ] Section 13 (Testing & QA) passed
- [ ] Documentation complete and accurate
- [ ] Environment variables set
- [ ] Team trained on deployment process

### Deployment
- [ ] Deploy to Vercel production
- [ ] Verify custom domain works
- [ ] Test all critical user flows
- [ ] Confirm monitoring active

### Post-Deployment
- [ ] Section 14 (Post-Launch Monitoring) implemented
- [ ] Monitor for first 24 hours
- [ ] Review analytics data
- [ ] Celebrate successful launch! 🎉

---

## Notes

- Tasks can be completed in parallel where dependencies allow
- Each section builds on previous sections
- Testing is integrated throughout, not just at the end
- Documentation should be updated as implementation progresses
- Regular communication with stakeholders recommended

**Estimated Total Time**: 60-80 hours (depending on team size and experience)

**Recommended Team**:
- 1 Backend/Infrastructure Developer
- 1 Frontend Developer (for integration)
- 1 QA/Testing Specialist
- 1 DevOps Engineer (part-time)

**Priority Order** (for MVP):
1. Sections 1-3 (Foundation)
2. Section 5 (Contact Form)
3. Section 6 (Optimization)
4. Section 13 (Testing)
5. Section 2 (Deployment)
6. Remaining sections (enhancements)
