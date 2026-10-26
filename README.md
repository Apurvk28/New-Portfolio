# Apurv Khairnar — Portfolio Website

<div align="center">

  [![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![WebGL](https://img.shields.io/badge/Graphics-OGL_WebGL-black?style=for-the-badge&logo=webgl&logoColor=white)](https://github.com/oframe/ogl)
  [![License](https://img.shields.io/badge/License-MIT-000000?style=for-the-badge)](LICENSE)

  <p align="center">
    A high-performance monochrome editorial portfolio showcasing digital craftsmanship, spatial web animations, and interactive design engineering.
  </p>

  <p align="center">
    <strong><a href="https://github.com/Apurvk28">Apurv Khairnar</a></strong> — Full-Stack Web Developer & Designer
  </p>

</div>

---

## ✦ Project Overview

This is the personal portfolio website of **Apurv Khairnar**. Built with **React 18** and **Vite**, it combines brutalist editorial typography with custom WebGL shaders, spatial scroll mechanics, and interactive physics engines. The website is engineered to deliver fluid 60+ FPS interactions, responsive layouts across devices, and deep-dive case studies for production client projects.

---

## ✦ Tech Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Core Framework** | [React 18](https://react.dev/) | Modular component architecture, state management & hooks |
| **Build Tool & Bundler** | [Vite 6](https://vitejs.dev/) | Fast Hot Module Replacement (HMR) and optimized rollup production bundles |
| **Graphics & WebGL** | [OGL](https://github.com/oframe/ogl) | Ultra-lightweight WebGL engine for liquid distortion meshes and vertex shaders |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) + CSS | Custom design tokens, glassmorphism, responsive grid & fluid spacing |
| **Typography** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) | Editorial sans-serif typography with dynamic fluid viewport clamp sizing |
| **Physics & Motion** | Custom Canvas & Vanilla JS Math | Inertia lerping, 3D cylindrical projections, and drag physics |

---

## ✦ Key Features

- **🗞️ Editorial Hero & Metallic Typography**: Dynamic viewport-scaled headers, layered depth masking, and instant discipline navigation.
- **🔍 Kinetic Scroll Expansion (`ScrollExpandMedia`)**: Scroll-driven media viewport that seamlessly interpolates dimensions, aspect ratio, and hardware-accelerated unblur filters without layout thrashing.
- **🌊 WebGL Liquid Carousel (`OGL`)**: Card slider powered by WebGL with real-time liquid lens bending, vertex displacement, drag momentum, and card selection.
- **🧭 Horizontal Spatial Experience Timeline**: Vertical-to-horizontal scroll translation featuring career milestones, tech stack indicators, and chapter jumping.
- **🎡 3D Cylindrical Drum Reel (`WorksWheel`)**: Radial 3D transform projection for browsing credentials and certifications with velocity inertia.
- **🪢 Interactive String Tie Footer**: Dynamic canvas physics simulation that responds to cursor interactions and anchors the footer CTA.
- **🪟 Interactive Modal Ecosystem**:
  - **Project Case Studies**: Glassmorphic modal with deliverable scopes, live URLs, screenshots, and architecture details.
  - **Resume Viewer**: Integrated document viewer modal with instant PDF download.
  - **Contact Inquiries**: Interactive contact form with input validation and non-blocking toast notifications.

---

## ✦ Folder Structure

```bash
new-portfolio/
├── index.html                   # HTML entry point with meta tags & Google Fonts
├── package.json                 # Project dependencies and npm scripts
├── package-lock.json            # Deterministic lockfile
├── vite.config.js               # Vite configuration & React plugin setup
├── tailwind.config.js           # Tailwind theme extensions, font families & colors
├── postcss.config.js            # PostCSS pipeline for Tailwind & Autoprefixer
├── .gitignore                   # Excludes node_modules, build outputs, logs, & system files
├── README.md                    # Project documentation
│
├── public/                      # Static publicly accessible assets
│   ├── assets/                  # Ambient backgrounds, textures & certificate captures
│   ├── Project Images/          # Curated project preview captures
│   ├── Landing Page Assest/     # Showcase landing page screenshots
│   └── resume.pdf               # Downloadable curriculum vitae
│
└── src/
    ├── main.jsx                 # React root mount entry point
    ├── App.jsx                  # Master composition & global modal/toast state
    ├── index.css                # Global typography, resets, metallic gradients & keyframes
    ├── assets/                  # Bundled images, portraits & graphics
    ├── components/
    │   ├── Navigation.jsx       # Floating glass header, active intersection observer & drawer
    │   ├── Hero.jsx             # Editorial hero, metallic title & depth mask
    │   ├── AboutSection.jsx     # Scroll-driven media expansion stage
    │   ├── FeaturedProjects.jsx # WebGL liquid carousel container
    │   ├── ExperienceSection.jsx# Horizontal spatial career timeline & inertia lerp
    │   ├── LandingPages.jsx     # Certificates 3D cylindrical drum reel container
    │   ├── Footer.jsx           # Oversized metallic CTA, socials & credits
    │   ├── ProjectModal.jsx     # Glassmorphic project case study modal
    │   ├── ResumeModal.jsx      # In-app resume viewer & download modal
    │   ├── ContactModal.jsx     # Interactive contact inquiry modal
    │   ├── ToastContainer.jsx   # Non-blocking feedback toast notifications
    │   ├── FlexCarousel.css     # Carousel layout, captions & navigation styling
    │   └── ui/
    │       └── string-tie-footer.jsx # Interactive canvas string simulation
    └── utils/
        ├── projectsData.js      # Curated project metadata, descriptions & stack details
        ├── flex-carousel.js     # OGL WebGL liquid lens shader engine
        └── works-wheel.js       # 3D cylindrical math & drag inertia engine
```

---

## ✦ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser.

### 3. Build for Production
```bash
npm run build
```
Optimized assets will be generated in the `dist/` directory.

---

## ✦ License

This project is open-source and available under the [MIT License](LICENSE).
