# Colorprof - Website

Modern, responsive website for a professional painter business. Built with Astro, pure CSS, and deployed on Vercel.

## 🎯 Project Overview

- **Framework**: Astro 5
- **Styling**: Pure CSS with CSS Variables
- **Deployment**: Vercel
- **Design**: Dark mode modern aesthetic
- **Approach**: Mobile-first responsive design
- **Language**: Español (Spanish) with internationalization support

## 📋 Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark mode modern theme with orange accent
- ✅ Mobile hamburger navigation menu
- ✅ Hero section with call-to-action
- ✅ Services grid (responsive 1-2-3 columns)
- ✅ Image gallery with hover effects
- ✅ FAQ accordion component
- ✅ Contact form with Vercel Forms integration
- ✅ Footer with business information
- ✅ SEO optimized (meta tags, sitemap, robots.txt)
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Performance optimized (Lighthouse 95+)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn package manager

### Installation

1. **Clone or install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your settings
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3000`

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Format code with Prettier
npm run format

# Run tests
npm test
npm run test:watch
npm run test:ui
npm run test:coverage

# End-to-end tests
npm run test:e2e
npm run test:e2e:debug

# Accessibility tests
npm run test:a11y

# Performance audit
npm run test:lighthouse
```

## 📁 Project Structure

```
src/
├── components/          # Astro components
│   ├── Header.astro    # Navigation header with mobile menu
│   ├── Hero.astro      # Landing hero section
│   ├── Services.astro  # Services grid
│   ├── Gallery.astro   # Portfolio gallery
│   ├── FAQ.astro       # FAQ accordion
│   ├── ContactForm.astro # Contact form with Vercel Forms
│   └── Footer.astro    # Footer with contact info
├── layouts/            # Layout templates
│   └── Layout.astro    # Main layout with SEO/meta tags
├── pages/              # Astro pages (routes)
│   └── index.astro     # Home page
├── styles/             # CSS files
│   ├── variables.css   # Design tokens and CSS variables
│   ├── global.css      # Global styles and reset
│   └── components/     # Component-specific styles
│       ├── header.css
│       ├── hero.css
│       ├── services.css
│       ├── gallery.css
│       ├── faq.css
│       ├── contact.css
│       └── footer.css
├── data/               # Static data/JSON
├── assets/             # Images and static assets
└── app.tsx            # Main app configuration

public/
├── robots.txt         # SEO robots instructions
├── sitemap.xml        # XML sitemap for search engines
├── favicon.svg        # Website favicon
└── ...               # Other public assets

dist/                 # Production build output
vercel.json          # Vercel deployment configuration
astro.config.mjs     # Astro configuration
tsconfig.json        # TypeScript configuration
package.json         # Project dependencies
```

## 🎨 Design System

### Colors (Dark Mode)
- **Background**: `#121212`
- **Secondary BG**: `#1e1e1e`
- **Text**: `#eaeaea`
- **Accent**: `#ff7a00` (Orange)
- **Success/Error**: Green/Red variants

### Typography
- **Font**: Inter (Google Fonts)
- **Responsive font sizes** with `clamp()` for fluid scaling
- **Line heights**: Tight (1.2), Normal (1.5), Relaxed (1.75)

### Spacing Scale
- `xs`: 0.5rem (8px)
- `sm`: 1rem (16px)
- `md`: 1.5rem (24px)
- `lg`: 2rem (32px)
- `xl`: 3rem (48px)

### Breakpoints (Mobile-First)
- **Mobile**: 320px+ (default)
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 📊 Responsive Design

All components follow **mobile-first** methodology:
1. Base styles are for mobile (320px)
2. Progressive enhancement using `@media (min-width: XXX)`
3. No downgrading for smaller screens

## 🔗 Contact Form Integration

Uses **Vercel Forms** for native form handling:
- No external dependencies required
- Automatic email forwarding to site owner
- Built-in spam protection with honeypot field
- Client-side HTML5 validation

## 📱 Mobile Menu

Interactive hamburger menu for mobile devices:
- Click to toggle open/close
- Click link to navigate and close
- ESC key to close
- Prevents body scroll when open

## ♿ Accessibility

- WCAG 2.1 Level AA compliance
- Semantic HTML5 throughout
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible states on interactive elements
- Color contrast ratios meet WCAG AA standards
- Reduced motion support for animations

## 🔒 Security Headers

Vercel configuration includes:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Strict-Transport-Security` (HTTPS enforcement)
- `Content-Security-Policy` (XSS protection)
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📈 Performance Optimization

- **Lighthouse targets**: 95+ on all metrics
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **CSS**: Minified in production, variables for reusability
- **Images**: Lazy loading, responsive sizing, optimized formats
- **Build**: Tree-shaking, code splitting, asset optimization

## 🧪 Testing

### Unit Tests
```bash
npm test              # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

### E2E Tests
```bash
npm run test:e2e     # Run Playwright tests
npm run test:e2e:debug # UI mode for debugging
```

### Accessibility Tests
```bash
npm run test:a11y    # Run axe-core accessibility tests
```

### Performance Tests
```bash
npm run test:lighthouse # Run Lighthouse audit
```

## 🚀 Deployment

### Automatic Deployment with Vercel

1. **Connect GitHub repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Automatic deployments** on every push to `main`
4. **Preview deployments** for pull requests

### Manual Deployment

```bash
# Build locally
npm run build

# Deploy to Vercel
vercel --prod
```

## 🔄 CI/CD Pipeline

GitHub Actions workflow (optional):
- Lint code on push
- Run tests
- Build project
- Deploy to Vercel

## 📝 Environment Variables

Required for deployment:
- `SITE_URL` - Base URL of the website
- `VITE_API_BASE` - (Optional) API base URL for future integrations

See `.env.local.example` for template.

## 🛠️ Technologies

- **Astro 5** - Static site generation
- **TypeScript** - Type-safe JavaScript
- **CSS Variables** - Dynamic theming system
- **Vercel** - Hosting and deployment
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📞 Contact Information

**Colorprof**
- 📱 Teléfono: (+34) 638 94 39 62
- 📧 Email: info@colorprof.es
- 📍 Ubicación: Madrid, España
- 🕒 Horario: Lunes-Viernes 9:00-18:00, Sábado 10:00-14:00

## 📄 License

MIT License - Feel free to use this project as a template

## 🤝 Contributing

Pull requests welcome! Please:
1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass before submitting PR

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [MDN CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Vercel Documentation](https://vercel.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Status**: ✅ Production Ready
