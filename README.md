# Matthias Amire | Premium Developer Portfolio & Amire Studio Launcher

A state-of-the-art, immersive personal portfolio website and mobile application showcase built using **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Three.js**, and **Framer Motion**.

Optimized for high performance, accessibility, search indexing, and fluid 3D animations, this codebase replaces a legacy Vite setup to represent a professional, minimalist dark-themed developer dashboard.

---

## 🚀 Key Features

### 1. Immersive 3D & WebGL Experiences
*   **Warp-Speed Starfield Background**: A custom [three-background](file:///Users/user/Documents/projects/portfolio/matthiasamire.com/components/three-background.tsx) component rendering a 3D particle system that drifts dynamically. On scroll, it tracks scroll velocity to stretch particles along the Z-axis and dilate the camera's Field of View (FOV) from 75 to 115, creating a warp speed camera warping effect.
*   **3D Glassmorphic Torus Knot Halo**: Rendered next to the hero profile image using [hero-mesh](file:///Users/user/Documents/projects/portfolio/matthiasamire.com/components/hero-mesh.tsx). This uses Three.js's physical materials (`MeshPhysicalMaterial`) to simulate glass transparency, refractivity index (`ior: 1.52`), thickness, and clearcoat gloss. Point lights shift based on cursor moves to project sliding glass reflections.
*   **Interactive Dotted Globe centerpiece**: Renders in the career history section via [experience-globe](file:///Users/user/Documents/projects/portfolio/matthiasamire.com/components/experience-globe.tsx), projecting Nigeria and UK pins connected by flowing light paths.

### 2. Tactile 3D Perspective Grid
*   **Cursor-Reflective 3D Tilt Wrapper**: Created a reusable [three-d-tilt](file:///Users/user/Documents/projects/portfolio/matthiasamire.com/components/three-d-tilt.tsx) component. Using Framer Motion springs (`useSpring`), it translates cursor position into perspective rotations (`rotateX`/`rotateY`) and coordinates a moving radial spotlight overlay to mimic realistic light reflections off glass layers.
*   **Bento Grid Integrations**: Applied across project showcase bento containers in [project-card](file:///Users/user/Documents/projects/portfolio/matthiasamire.com/components/project-card.tsx) and skills tags inside [skills-grid](file:///Users/user/Documents/projects/portfolio/matthiasamire.com/components/skills-grid.tsx).

### 3. GPU-Accelerated Cursor Glow Spotlight
*   A global [cursor-glow](file:///Users/user/Documents/projects/portfolio/matthiasamire.com/components/cursor-glow.tsx) tracker embedded in [layout](file:///Users/user/Documents/projects/portfolio/matthiasamire.com/app/layout.tsx). It drives a large, soft blurred background circle (`blur-[120px] bg-indigo-600/6`) matching cursor positions. Built entirely on CSS GPU translates to ensure 120 FPS performance with zero layout calculation overhead.

### 4. VaultVoss App Launcher Sub-Routes
*   A dedicated landing section at `/apps/vaultvoss` showcasing the **VaultVoss** ledger application. Mimics store release specs with vector devices, feature breakdowns (Net Worth tracking, Budget constraints, subscription timelines), and hardware biometric indicators.
*   Houses standard compliance subroutes `/apps/vaultvoss/privacy` and `/apps/vaultvoss/terms` optimized for search indexing.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 16.2.9 (App Router / Static Export ready)
*   **Core Logic**: React 19.2.4 & TypeScript
*   **Styling**: Tailwind CSS v4 & PostCSS
*   **3D Engines**: Vanilla Three.js (ensuring full compatibility with React 19 without peer-dependency conflicts)
*   **Animations**: Framer Motion 12.4.0
*   **Icons**: Lucide React & Custom Brand Icon SVGs

---

## 📂 Codebase Architecture

```bash
├── app/
│   ├── apps/
│   │   └── vaultvoss/
│   │       ├── privacy/page.tsx   # VaultVoss Privacy page
│   │       ├── terms/page.tsx     # VaultVoss Terms page
│   │       └── page.tsx           # VaultVoss App Landing page
│   ├── favicon.ico
│   ├── globals.css                # Style tokens & Glassmorphism variables
│   ├── layout.tsx                 # Core HTML wrappers, global backgrounds & SEO
│   └── page.tsx                   # Main Portfolio landing page
├── components/
│   ├── brand-icons.tsx            # Custom inline SVG brand logos
│   ├── contact-form.tsx           # Contact Form validation & composing
│   ├── cursor-glow.tsx            # Mouse-following background glow element
│   ├── experience-globe.tsx       # 3D dotted wireframe Globe centerpiece
│   ├── experience-timeline.tsx    # Scroll-revealed professional history card grid
│   ├── footer.tsx                 # Semantic layout footer
│   ├── hero-mesh.tsx              # Glassmorphic WebGL Torus Knot 3D Halo
│   ├── project-card.tsx           # Dynamic Project Bento grids with Category Filters
│   ├── skills-grid.tsx            # Tech Stack Bento lists
│   ├── three-background.tsx       # Scrolling speed particle space warp background
│   ├── three-d-tilt.tsx           # Reusable 3D Perspective Card Tilt component
│   └── typing-text.tsx            # 3D X-axis rotating cycler typing script
├── data/
│   └── portfolio.ts               # Content data schema records
├── public/                        # Static assets (images, logos, PDF Resume)
├── package.json
└── tsconfig.json
```

---

## 💻 Local Development

Follow these steps to run the project locally on your machine:

1.  **Clone the Repository** and navigate into the folder:
    ```bash
    cd matthiasamire.com
    ```

2.  **Install Dependencies**:
    ```bash
    yarn install
    ```

3.  **Run Development Server**:
    ```bash
    yarn dev
    ```
    *Open [http://localhost:3000](http://localhost:3000) to view the website in your browser.*

4.  **Lint & Format Check**:
    ```bash
    yarn lint
    ```

5.  **Build Optimization (Production Bundle)**:
    ```bash
    yarn build
    ```
    This compiles the Next.js routes statically for production deployment.
