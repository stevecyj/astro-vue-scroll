# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Development
npm run dev          # Start development server at http://localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally

# Astro CLI
npm run astro add    # Add integrations (e.g., npm run astro add tailwind)
npm run astro check  # Type check the project
```

## Architecture Overview

### Core Technology Stack
- **Astro 5.11.0**: Main framework with file-based routing and Vue integration
- **Vue 3.5.17**: Frontend framework for all page components with client-side hydration
- **ClientRouter**: Astro's client-side routing for smooth page navigation
- **Stagewise Toolbar**: Development debugging and monitoring tool
- **lodash-es**: Utility library for JavaScript helper functions

### Project Structure
```
src/
├── layouts/
│   └── Layout.astro          # Base layout with ClientRouter and global styles
├── pages/                    # File-based routing (6 pages total)
│   ├── index.astro          # Home page (uses HeroSection.vue)
│   ├── who-we-are.astro     # About page (uses AboutSection.vue)
│   ├── live-casino.astro    # Casino games (uses CasinoSection.vue)
│   ├── news.astro           # News articles (uses NewsSection.vue)
│   ├── contact.astro        # Contact form (uses ContactSection.vue)
│   └── blog.astro           # Blog posts (uses BlogSection.vue)
├── components/
│   └── LayoutWrapper.vue    # Navigation layout with Stagewise Toolbar
├── views/                   # Vue components for page content
│   ├── HeroSection.vue      # Home page content
│   ├── AboutSection.vue     # Who We Are page content
│   ├── CasinoSection.vue    # Live Casino page content
│   ├── NewsSection.vue      # News page content
│   ├── ContactSection.vue   # Contact page content
│   └── BlogSection.vue      # Blog page content
└── modules/
    └── app.js               # Vue app configuration and island handling
```

### Dynamic Page Transition System

This project implements an intelligent page transition system that automatically adjusts animation directions based on page types:

**Core Features:**
- **Smart Direction Detection**: Transitions adapt based on source and target page types
- **Visual Consistency**: Ensures coordinated slide directions for seamless navigation
- **Dynamic CSS**: JavaScript dynamically sets `view-transition-name` for different transition effects

**Page Type Classification:**
- **Special Pages** (`data-page-type="special"`): Home (/) and About (/who-we-are)
  - Use custom `view-transition-name`: `hero-page` and `about-page`
- **Normal Pages** (`data-page-type="normal"`): Casino, News, Blog, Contact
  - Dynamically assigned transition names based on navigation context

**Transition Matrix:**
```
Source → Target     | Exit Animation    | Enter Animation
Special → Normal    | Slide up         | Slide from bottom
Special → Special   | Slide down       | Slide from top
Normal → Special    | Slide down       | Slide from top  
Normal → Normal     | Slide up         | Slide from bottom (default)
```

**Technical Implementation:**
- **Event Listener**: `astro:before-preparation` event for pre-transition logic
- **Dynamic Assignment**: JavaScript modifies `view-transition-name` based on page type combinations
- **CSS Animations**: Four directional animations (slide-out-up/down, slide-in-up/down)
- **Accessibility**: Full `prefers-reduced-motion` support for all transition names

**Animation Details:**
- Duration: 0.6s with ease-in-out timing
- Transform: Full viewport height translations (`translateY(±100vh)`)
- Opacity: Coordinated fade effects for smooth visual flow

### ClientRouter Implementation

Built on Astro's ClientRouter with enhanced dynamic transitions:

- **Layout.astro** contains the `<ClientRouter />` component in the `<head>`
- **Dynamic Transition Logic**: JavaScript in Layout.astro handles intelligent direction selection
- **Global CSS Rules**: Comprehensive animation definitions for all transition combinations
- **Stagewise Toolbar**: Integrated via LayoutWrapper.vue for development debugging

### Design System

**Navigation**: Fixed header with glassmorphism effect (backdrop-blur + semi-transparent background)

**Page Layout Pattern**: All pages follow the same structure:
- Full viewport height (`calc(100vh - 80px)` to account for navbar)
- Gradient backgrounds with unique color schemes per page
- Centered content containers with max-width constraints
- Consistent typography scale and spacing

**Color Themes by Page**:
- Home: Blue-purple gradient (`#667eea` to `#764ba2`)
- Who We Are: Green gradient (`#11998e` to `#38ef7d`)
- Live Casino: Dark gradient (`#2c3e50` to `#fd746c`)
- News: Purple-green gradient (`#8360c3` to `#2ebf91`)
- Contact: Blue-purple gradient (matches home)
- Blog: Pink gradient (`#ff9a9e` to `#fecfef`)

### CSS Architecture

- **Global Reset**: Universal box-sizing, margin/padding reset
- **System Fonts**: Uses native font stack for optimal performance
- **Modern CSS**: Extensive use of CSS Grid, Flexbox, and backdrop-filter
- **Component Scoping**: Each page has scoped styles within `<style>` tags
- **Responsive Design**: Mobile-first approach with grid auto-fit patterns

### Page Components Structure

Each page follows this hybrid Astro + Vue pattern:
1. **Astro Page**: Import Layout.astro and corresponding Vue component
2. **Pass Props**: Send title to Layout and use `client:load` for Vue component
3. **Vue Component**: Wraps content in LayoutWrapper.vue (includes navigation + Stagewise Toolbar)
4. **Content Section**: Themed background with gradient specific to each page
5. **Scoped Styles**: Each Vue component has scoped styles within `<style scoped>` tags

Example pattern:
```astro
---
import Layout from "../layouts/Layout.astro"
import PageSection from "../views/PageSection.vue"
---

<Layout title="Page Title">
  <PageSection client:load />
</Layout>
```

### Adding New Pages

1. Create new `.astro` file in `src/pages/`
2. Create corresponding `.vue` component in `src/views/`
3. **Set Page Type**: Add `data-page-type="normal"` or `data-page-type="special"` to the root element
4. **Add Transition Name**: For special pages, set appropriate `view-transition-name` in CSS
5. Import Layout.astro and Vue component in the Astro page
6. Add navigation link to LayoutWrapper.vue navbar
7. Follow existing design patterns for consistency
8. Choose a unique gradient color scheme for the Vue component

**Page Type Guidelines:**
- Use `data-page-type="special"` for main landing pages (Home, About)
- Use `data-page-type="normal"` for content pages (Blog, News, Contact, etc.)
- Special pages require custom `view-transition-name` in their CSS styles

### Vue Integration Architecture

Vue is fully integrated via `@astrojs/vue` with custom app configuration:

**Key Features:**
- **App Entry Point**: `src/modules/app.js` handles Vue instance configuration
- **Island Architecture**: Each Vue component hydrates independently with `client:load`
- **Shared Layout**: LayoutWrapper.vue provides consistent navigation across all pages
- **Stagewise Toolbar**: Development tool integrated at the Vue component level

**Vue Component Structure:**
1. **Views Components** (`src/views/`): Page-specific content components
2. **Layout Components** (`src/components/`): Reusable layout and navigation
3. **Hydration Strategy**: Uses `client:load` for immediate interactivity
4. **Multiple Instance Handling**: `lodash-es.once()` prevents duplicate Vue app initialization

**Adding New Vue Components:**
1. Create `.vue` files in appropriate directory (`src/views/` for pages, `src/components/` for reusable)
2. Import and use in `.astro` files with `client:load` directive
3. Follow LayoutWrapper.vue pattern for consistent navigation

### Configuration Notes

- **TypeScript**: Enabled with strict mode in `tsconfig.json`
- **PostCSS**: Configured in `astro.config.mjs` for CSS processing
- **Vue Integration**: Configured with custom `appEntrypoint` in `astro.config.mjs`
- **ClientRouter**: Astro's built-in client-side routing, no additional configuration needed
- **Stagewise Toolbar**: Development tool for debugging, configured in package.json devDependencies

### Dynamic Transition System Implementation

**Core Files:**
- **Layout.astro**: Contains transition event listeners and CSS animation definitions
- **Views Components**: Each Vue component has `data-page-type` attribute for classification
- **LayoutWrapper.vue**: Navigation component (no special transition handling needed)

**Key Implementation Details:**
```javascript
// Layout.astro - Event listener for dynamic transitions
document.addEventListener('astro:before-preparation', (event) => {
  const currentPageElement = document.querySelector('[data-page-type]');
  const currentPageType = currentPageElement?.getAttribute('data-page-type');
  
  // Target page type detection
  const targetUrl = event.to.pathname;
  const isTargetSpecial = targetUrl === '/' || targetUrl === '/who-we-are';
  const targetPageType = isTargetSpecial ? 'special' : 'normal';
  
  // Dynamic transition name assignment based on page type combination
  if (currentPageType === 'special' && targetPageType === 'normal') {
    // Special to Normal: Slide up exit
  } else if (currentPageType === 'normal' && targetPageType === 'special') {
    // Normal to Special: Slide down exit
  }
});
```

**For Future AI Assistance:**
To implement similar dynamic transition systems, use this prompt:
> "實現基於頁面類型的動態 view transition 系統：special 頁面(首頁、關於)和 normal 頁面根據轉場組合自動調整滑入滑出方向，確保視覺一致性"