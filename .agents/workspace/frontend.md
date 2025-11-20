# Frontend Implementation Plan - Content Migration

**Status**: Ready for implementation
**Estimated Time**: 2 hours
**Model**: Haiku

---

## Phase 1: Update Services Component (30 min)

### Task 1.1: Read current Services component
- [ ] Read `/src/components/Services.astro` to understand current structure
- [ ] Read `/src/styles/components/services.css` to understand current styling
- [ ] Time estimate: 5 min

### Task 1.2: Update Services.astro content
- [ ] Update Card 1 (Interior):
  - [ ] Title: "Pintura Interior"
  - [ ] Description: "Transformamos tus espacios interiores con acabados profesionales"
  - [ ] Add detailed list: 200+ colores, alisados, gotelé, papel pintado, decoración, restauración, humedades, marcas ISAVAL/JUNO/CAPAROL
- [ ] Update Card 2 (Exterior):
  - [ ] Title: "Pintura Exterior"
  - [ ] Description: "Protegemos y embellecemos fachadas con materiales de primera calidad"
  - [ ] Add detailed list: rehabilitación fachadas, microcementos, impermeabilización, imprimaciones, técnicas presión, resistentes clima, monocapas
- [ ] Update Card 3 (Industrial):
  - [ ] Change title from "Decoración Personalizada" to "Pintura Industrial"
  - [ ] Description: "Soluciones especializadas para proyectos industriales y comerciales"
  - [ ] Add detailed list: intumescentes (fuego), metálicas, anticorrosiva, suelos/garajes, cubiertas/terrazas, tratamientos especializados
- [ ] Time estimate: 15 min

### Task 1.3: Adjust Services CSS if needed
- [ ] Verify card height accommodates longer content
- [ ] Adjust padding/margins if text overflows
- [ ] Ensure responsive design still works (mobile: 320px+, tablet: 768px+, desktop: 1024px+)
- [ ] Test that cards remain visually balanced
- [ ] Time estimate: 10 min

**Acceptance Criteria - Services**:
- [ ] All 3 cards have expanded detailed content
- [ ] Card 3 title is "Pintura Industrial"
- [ ] Professional brands (ISAVAL, JUNO, CAPAROL) mentioned in Interior
- [ ] Responsive design maintained on all breakpoints
- [ ] Visual consistency with existing design

---

## Phase 2: Create "Nuestra Historia" Section (45 min)

### Task 2.1: Create About.astro component
- [ ] Create new file `/src/components/About.astro`
- [ ] Add frontmatter with CSS import
- [ ] Create section structure with:
  - [ ] Main container (`.about-section`)
  - [ ] Content wrapper (`.about-container`)
  - [ ] 2-column grid (`.about-content` and `.about-image`)
  - [ ] Title: "Alta Calidad en Todos Nuestros Trabajos Desde 2000"
  - [ ] Main paragraph (3 paragraphs from plan)
  - [ ] Values list (`.about-values`) with 5 bullet points
  - [ ] Placeholder image or SVG
- [ ] Use semantic HTML (section, h2, p, ul, li)
- [ ] Add ARIA labels for accessibility
- [ ] Time estimate: 20 min

### Task 2.2: Create about.css styles
- [ ] Create new file `/src/styles/components/about.css`
- [ ] Define section styles:
  - [ ] Background with glassmorphism effect
  - [ ] Padding using CSS variables (--spacing-*)
  - [ ] Container max-width: 1200px
- [ ] Define 2-column grid layout:
  - [ ] Desktop: grid-template-columns: 1fr 1fr
  - [ ] Gap: var(--spacing-2xl)
  - [ ] Mobile: 1 column (stack vertically)
- [ ] Style title (h2):
  - [ ] Font size: var(--font-size-h2)
  - [ ] Color: var(--color-text)
  - [ ] Gradient text effect (optional)
- [ ] Style paragraphs:
  - [ ] Line height: var(--line-height-relaxed)
  - [ ] Color: var(--color-text-secondary)
  - [ ] Margin bottom: var(--spacing-md)
- [ ] Style values list:
  - [ ] Custom bullet points or icons
  - [ ] Proper spacing between items
  - [ ] Highlight collaboration (Médicos sin Fronteras, ACNUR)
- [ ] Style image container:
  - [ ] Border radius: var(--border-radius-lg)
  - [ ] Box shadow for depth
  - [ ] Aspect ratio: 16/9 or 4/3
- [ ] Responsive breakpoints:
  - [ ] Mobile (< 768px): 1 column, image below text
  - [ ] Tablet (768px+): 2 columns
  - [ ] Desktop (1024px+): larger spacing
- [ ] Time estimate: 20 min

### Task 2.3: Import About.astro styles
- [ ] Add `import '@/styles/components/about.css';` to About.astro frontmatter
- [ ] Time estimate: 1 min

### Task 2.4: Add placeholder image
- [ ] Create or use placeholder image at `/public/about-gandia.jpg`
- [ ] Alternative: Use SVG placeholder or gradient background
- [ ] Optimize image size (max 800px width, WebP format)
- [ ] Add alt text: "Profesionales del Color - Gandía, Valencia"
- [ ] Time estimate: 4 min

**Acceptance Criteria - About Section**:
- [ ] Component created at `/src/components/About.astro`
- [ ] CSS file created at `/src/styles/components/about.css`
- [ ] Title exactly matches: "Alta Calidad en Todos Nuestros Trabajos Desde 2000"
- [ ] All 3 paragraphs included
- [ ] 5 corporate values listed
- [ ] Médicos sin Fronteras and ACNUR mentioned
- [ ] 2 columns on desktop, 1 column on mobile
- [ ] Glassmorphism effects consistent with site
- [ ] Placeholder image included

---

## Phase 3: Update FAQ Component (30 min)

### Task 3.1: Read current FAQ component
- [ ] Read `/src/components/FAQ.astro` to understand accordion structure
- [ ] Identify how questions/answers are structured
- [ ] Check if using array/loop or individual items
- [ ] Time estimate: 5 min

### Task 3.2: Replace FAQ content
- [ ] Remove current 5 questions
- [ ] Add 9 new questions with full answers:
  1. [ ] ¿Cuánto se tarda en pintar mi casa? (60m²=1.5d, 80m²=2d, 100m²=3d)
  2. [ ] ¿Tenemos que preparar algo nosotros? (servicio integral)
  3. [ ] ¿Qué tipo de pintura utilizáis? (ISAVAL, JUNO, CAPAROL)
  4. [ ] ¿Cuánto me va a costar? (presupuesto gratuito personalizado)
  5. [ ] ¿Tenemos garantía? (retoques + 24 meses)
  6. [ ] ¿Estáis asegurados? (RC, SS, Hacienda)
  7. [ ] ¿Es gratuito solicitar presupuesto? (sí, incluye asesoramiento)
  8. [ ] ¿Cumplís con los plazos acordados? (seriedad y compromiso)
  9. [ ] ¿Respetáis el medio ambiente? (bajo nivel contaminación, reciclado)
- [ ] Maintain accordion functionality
- [ ] Time estimate: 20 min

### Task 3.3: Verify FAQ styles with longer content
- [ ] Check that accordion height adjusts properly
- [ ] Verify padding/margins with longer text
- [ ] Test accordion open/close animation
- [ ] Ensure responsive design on mobile
- [ ] Time estimate: 5 min

**Acceptance Criteria - FAQ**:
- [ ] 9 questions implemented (old 5 removed)
- [ ] All answers complete and properly formatted
- [ ] Accordion functionality works correctly
- [ ] No overflow or layout issues with longer content
- [ ] Responsive design maintained
- [ ] Professional brands mentioned in Q3

---

## Phase 4: Prepare Gallery Structure (20 min)

### Task 4.1: Create gallery folder structure
- [ ] Create folder `/public/gallery/exterior/`
- [ ] Create folder `/public/gallery/interior/`
- [ ] Create folder `/public/gallery/industrial/`
- [ ] Time estimate: 2 min

### Task 4.2: Create gallery README
- [ ] Create `/public/gallery/README.md` with:
  - [ ] Instructions for adding images
  - [ ] Recommended image specs (format, size, dimensions)
  - [ ] Naming conventions
  - [ ] List of categories (exterior, interior, industrial)
- [ ] Time estimate: 5 min

### Task 4.3: Document image URLs from original site
- [ ] Create `/public/gallery/IMAGE_SOURCES.md`
- [ ] List all image URLs from original WordPress site:
  - [ ] Exterior images (~13 URLs)
  - [ ] Interior images (~17 URLs)
  - [ ] Industrial images (~8 URLs)
- [ ] Add download instructions for client
- [ ] Time estimate: 10 min

### Task 4.4: Add placeholder images (optional)
- [ ] Create 3 placeholder images (one per category)
- [ ] Or add SVG placeholders
- [ ] Update Gallery.astro to use placeholders if needed
- [ ] Time estimate: 3 min

**Acceptance Criteria - Gallery**:
- [ ] Three folders created: exterior, interior, industrial
- [ ] README.md with clear instructions created
- [ ] IMAGE_SOURCES.md with all URLs documented
- [ ] Placeholder images added (if applicable)
- [ ] Gallery component ready to receive real images

---

## Phase 5: Update Location Information (10 min)

### Task 5.1: Update Footer.astro
- [ ] Read `/src/components/Footer.astro`
- [ ] Change "Madrid, España" to "Gandía, Valencia"
- [ ] Verify no other location references in footer
- [ ] Time estimate: 3 min

### Task 5.2: Update Términos page
- [ ] Read `/src/pages/terminos.astro`
- [ ] Find location in contact section (line ~75)
- [ ] Change "Madrid, España" to "Gandía, Valencia"
- [ ] Time estimate: 2 min

### Task 5.3: Update Garantía page
- [ ] Read `/src/pages/garantia.astro`
- [ ] Find location in contact section (line ~138)
- [ ] Change "Madrid, España" to "Gandía, Valencia"
- [ ] Time estimate: 2 min

### Task 5.4: Verify no other location references
- [ ] Search codebase for "Madrid" references
- [ ] Update any remaining instances
- [ ] Time estimate: 3 min

**Acceptance Criteria - Location**:
- [ ] Footer shows "Gandía, Valencia"
- [ ] Términos page shows "Gandía, Valencia"
- [ ] Garantía page shows "Gandía, Valencia"
- [ ] No remaining "Madrid" references
- [ ] All location info consistent

---

## Phase 6: Integration (15 min)

### Task 6.1: Integrate About component in index.astro
- [ ] Read `/src/pages/index.astro`
- [ ] Import About component: `import About from '@/components/About.astro';`
- [ ] Find location between Services and FAQ sections
- [ ] Add `<About />` component
- [ ] Verify proper spacing between sections
- [ ] Time estimate: 5 min

### Task 6.2: Visual verification
- [ ] Check that all sections flow correctly
- [ ] Verify spacing between Hero → Services → About → FAQ → Gallery → Contact
- [ ] Ensure no layout breaks
- [ ] Time estimate: 5 min

### Task 6.3: Build verification
- [ ] Run `npm run build`
- [ ] Verify no TypeScript errors
- [ ] Verify no build errors
- [ ] Check output for warnings
- [ ] Time estimate: 5 min

**Acceptance Criteria - Integration**:
- [ ] About component imported in index.astro
- [ ] About component placed between Services and FAQ
- [ ] All sections properly aligned and spaced
- [ ] No layout issues or visual breaks
- [ ] Build completes successfully

---

## Phase 7: Testing & Verification (10 min)

### Task 7.1: Browser testing
- [ ] Open site in browser (npm run dev)
- [ ] Verify Hero section displays correctly
- [ ] Scroll to Services - check all 3 cards with new content
- [ ] Scroll to About - check 2-column layout (desktop)
- [ ] Scroll to FAQ - open/close all 9 questions
- [ ] Scroll to Gallery - verify structure ready
- [ ] Scroll to Contact - verify form works
- [ ] Check Footer - verify "Gandía, Valencia"
- [ ] Time estimate: 5 min

### Task 7.2: Responsive testing
- [ ] Test on mobile (320px, 375px, 414px)
  - [ ] Services cards stack vertically
  - [ ] About section is 1 column
  - [ ] FAQ accordion works
- [ ] Test on tablet (768px, 1024px)
  - [ ] Services in grid
  - [ ] About in 2 columns
- [ ] Test on desktop (1440px+)
  - [ ] All sections properly centered
  - [ ] Max-widths applied correctly
- [ ] Time estimate: 5 min

### Task 7.3: Accessibility check
- [ ] Tab through page with keyboard
- [ ] Verify ARIA labels present
- [ ] Check color contrast (text vs background)
- [ ] Test accordion keyboard navigation
- [ ] Time estimate: 3 min (part of browser testing)

**Acceptance Criteria - Testing**:
- [ ] All sections display correctly in browser
- [ ] Services cards show new content
- [ ] About section displays between Services and FAQ
- [ ] FAQ shows 9 questions with full answers
- [ ] Footer and legal pages show "Gandía, Valencia"
- [ ] Responsive on all breakpoints (320px - 1440px+)
- [ ] No console errors
- [ ] Build succeeds without warnings
- [ ] Accessibility features functional

---

## Final Checklist

### Code Quality
- [ ] No TypeScript `any` types used
- [ ] No TODO comments left in code
- [ ] All imports properly organized
- [ ] Consistent code formatting
- [ ] CSS follows existing conventions (variables, naming)

### Content Accuracy
- [ ] All text content matches specification exactly
- [ ] 9 FAQ questions with complete answers
- [ ] 3 service cards with detailed content
- [ ] About section with 5 corporate values
- [ ] Professional brands mentioned (ISAVAL, JUNO, CAPAROL)
- [ ] Collaboration with Médicos sin Fronteras and ACNUR mentioned

### Visual Consistency
- [ ] Glassmorphism effects match existing sections
- [ ] Color scheme consistent (gradients, text colors)
- [ ] Spacing consistent (using CSS variables)
- [ ] Typography consistent (font sizes, weights, line heights)
- [ ] Border radius consistent across components

### Performance
- [ ] Images optimized (if added)
- [ ] No large files added to build
- [ ] CSS file sizes reasonable
- [ ] Build time not significantly increased

### Documentation
- [ ] Gallery README.md created with clear instructions
- [ ] IMAGE_SOURCES.md created with all URLs
- [ ] Code comments added where necessary (minimal, self-documenting code)

---

## Time Summary

| Phase | Estimated Time |
|-------|----------------|
| 1. Update Services | 30 min |
| 2. Create About Section | 45 min |
| 3. Update FAQ | 30 min |
| 4. Gallery Structure | 20 min |
| 5. Update Location | 10 min |
| 6. Integration | 15 min |
| 7. Testing | 10 min |
| **Total** | **2 hours** |

---

**Ready for implementation with Haiku model**
