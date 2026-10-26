# ECHO — Editorial Developer & Designer Portfolio (React + Vite)

<div align="center">

  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![WebGL](https://img.shields.io/badge/Graphics-OGL_WebGL-black?style=for-the-badge&logo=webgl&logoColor=white)](https://github.com/oframe/ogl)
  [![License](https://img.shields.io/badge/License-MIT-000000?style=for-the-badge)](LICENSE)

  <p align="center">
    <strong>A bespoke, high-performance monochrome editorial portfolio showcasing digital craftsmanship, spatial web animations, and interactive design engineering.</strong>
  </p>

  <p align="center">
    Crafted by <strong><a href="https://github.com/Apurvk28">Apurv Khairnar</a></strong> — Full-Stack Web Developer & Designer.
  </p>

</div>

---

## ✦ Overview

**ECHO** is an editorial developer and designer portfolio engineered with a focus on typography, fluid physics, and cutting-edge web graphics. Migrated to modern **React + JavaScript (ES Modules) + Vite**, it marries brutalist minimalism with rich micro-interactions, hardware-accelerated scroll animations, and interactive 3D drum reel navigation.

Whether presenting production landing pages, full-stack applications, or bespoke brand identities, ECHO provides an immersive editorial reading and browsing experience.

---

## ✦ Key Features & Interactive Architecture

### 1. 🗞️ Editorial Hero & Metallic Typography Shaders
- Fluid responsive typography driven by dynamic viewport calculations.
- Multi-layer metallic header effects and integrated portrait depth masking.
- Direct interactive discipline shortcuts linked to the Services section.

### 2. 🔍 `ScrollExpandMedia` Kinetic Canvas
- Scroll-driven media expansion stage that smoothly interpolates card dimensions, aspect ratio, and blur filters.
- Dual-layer GPU-accelerated unblur rendering running at 120 FPS without reflow penalties.
- Minimalist perimeter content layout ensuring 100% unobscured artwork visibility.

### 3. 🧭 Horizontal Spatial Experience Canvas
- Sticky horizontal timeline translating vertical user scroll into horizontal spatial progression.
- Interactive timeline panels displaying milestones, career history, and interactive chapter jump buttons.
- Accessible fallback honoring user OS preferences (`prefers-reduced-motion`).

### 4. 🎡 WorksWheel 3D Drum Reel
- Mathematical 3D cylindrical drum projection with radial ring transformations (`rotateX`, `rotateZ`, `translateZ`).
- Physics-based smooth drag gestures, momentum inertia, wheel scrolling, and step navigation.
- Deep project integration linking directly into dynamic modal inspection.

### 5. 🌊 FlexCarousel (OGL WebGL Liquid Preset)
- Interactive card slider powered by **OGL** (lightweight WebGL engine) with liquid lens bending and real-time mesh displacement.
- Real-time dragging, touch gestures, inertia, and focus-on-click navigation.
- Deep modal inspection with live links and project deliverables.

### 6. 🪟 Interactive Inspection Modals & Toasts
- Glassmorphic project viewer with animated backdrop blur.
- Interactive contact form modal with real-time field synchronization and toast notifications.

---

## ✦ Tech Stack

| Domain | Technology | Description |
|---|---|---|
| **Framework** | [React 18](https://react.dev/) | Component architecture, state management & hooks |
| **Tooling & Bundler** | [Vite 6](https://vitejs.dev/) | Lightning-fast HMR and production bundle optimization |
| **Graphics & WebGL** | [OGL](https://github.com/oframe/ogl) | High-performance WebGL 3D meshes & shaders for liquid bending |
| **Styling** | Vanilla CSS + Tailwind CSS v3 | Custom dark/light design tokens, typography & CSS variables |
| **Typography** | Plus Jakarta Sans | Editorial modernist sans-serif loaded from Google Fonts |
| **Components** | Modular JSX Components | Modular UI architecture inside `src/components/` |

---

## ✦ Project Structure

```bash
ep/
├── index.html                   # Minimal Vite HTML entry with metadata & font links
├── package.json                 # Project configuration & npm scripts
├── package-lock.json            # Deterministic lockfile
├── vite.config.js               # Vite bundler & server configuration
├── tailwind.config.js           # Tailwind theme tokens & fonts configuration
├── postcss.config.js            # PostCSS pipeline (Tailwind & Autoprefixer)
├── .gitignore                   # Excludes node_modules, dist, env files
├── README.md                    # Project documentation
├── public/                      # Static publicly accessible assets
│   ├── assets/                  # Hero portrait, background textures, ambient art
│   ├── Project Images/          # Curated project preview captures
│   └── Landing Page Assest/     # Showcase landing page screenshots
└── src/
    ├── main.jsx                 # React root mount entry point
    ├── App.jsx                  # Main composition layer
    ├── index.css                # Global typography, resets, metallic gradients, animations
    ├── assets/                  # Bundled assets & media
    ├── components/
    │   ├── Navigation.jsx       # Header, navigation pill, active observer, drawer
    │   ├── Hero.jsx             # Editorial hero, metallic title, depth mask
    │   ├── AboutSection.jsx     # ScrollExpandMedia scroll-expansion & GPU unblur
    │   ├── FeaturedProjects.jsx # FlexCarousel WebGL liquid engine container
    │   ├── ExperienceSection.jsx# Horizontal spatial timeline & inertia lerp
    │   ├── FlexCarousel.css     # WebGL carousel layout, captions & reels
    │   ├── LandingPages.jsx     # Certificates 3D drum reel container
    │   ├── Footer.jsx           # Oversized metallic "LET'S TALK", socials, credits
    │   ├── ProjectModal.jsx     # Interactive project inspection modal
    │   ├── ContactModal.jsx     # Contact inquiry modal with validation
    │   └── ToastContainer.jsx   # Non-blocking notification toasts
    └── utils/
        ├── projectsData.js      # Project metadata & case studies
        ├── flex-carousel.js     # OGL WebGL liquid carousel engine
        └── works-wheel.js       # 3D cylindrical drum reel mathematics engine
```

---

## ✦ Getting Started Locally

### Prerequisites
- Node.js (version 18 or later recommended)
- npm (installed with Node.js)

### Installation
```bash
# Install dependencies from root
npm install
```

### Development Server
```bash
# Start local Vite development server
npm run dev
```
Navigate to `http://localhost:5174` (or port displayed in terminal) to view the application with Hot Module Replacement (HMR).

### Production Build
```bash
# Compile optimized production bundle into dist/
npm run build
```

### Preview Production Build
```bash
# Preview the production build locally
npm run preview
```

---

## ✦ License

This project is open-source and available under the [MIT License](LICENSE).
