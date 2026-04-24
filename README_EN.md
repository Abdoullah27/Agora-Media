# Agora Growth Engine - Developer & Architecture Guide

Welcome to the **Agora Growth Engine** project repository. This document serves as the central source of truth for current developers, future maintainers, and Artificial Intelligence assistants operating on this codebase.

## 🚀 Project Overview
Agora Growth Engine is a premium, high-conversion agency platform designed for "Agora Media." It transitions a static marketing footprint into a dynamic, performance-driven web application. 
The platform is built to showcase a high-end portfolio (Social Media, Reels, Websites, Branding, 3D), capture leads via fluid UX, and allow internal, non-technical team members to manage content without touching source code.

**Tech Stack:** React 18, Vite, TypeScript, TailwindCSS, Framer Motion, react-router-dom, react-i18next.

## 🗺 Platform Architecture & Routing
The application acts as a Single Page Application (SPA), dynamically lazy-loading heavy routes to maintain a minimal Time-to-Interactive (TTI).

### Core Routes
- `/` - **Home Page:** Hero banner, Infinite Client Logos, Live KPIs, Services grid, Swiper-based Case Studies, Testimonials, FAQ, and Contact form.
- `/portfolio` - **Portfolio Hub:** A masonry-style gallery featuring dynamic category filtering (All, Social Media, Reels, Websites, Branding, 3D Work).
- `/admin` - **Admin Login:** The secure gateway.
- `/admin/dashboard` - **Content Management System (CMS):** The graphical interface where admins upload projects, edit descriptions, and manage images.

## ⚙️ Key Technical Systems

### 1. The Internal Admin CMS & Content Flow
Currently, the application runs **without a traditional backend**. To give the team an immediate, production-like experience:
- **State Manager:** Powered by `src/context/CMSContext.tsx`.
- **Database Simulation:** Uses the browser's `localStorage` to persist data.
- **Image Uploading:** The custom `<ImageUpload />` dropzone captures files, limits them to 1.5MB to prevent quota issues, and uses `FileReader` to generate `Base64` strings for immediate visual preview and storage. 
- **Data Model:** Handled strictly via TypeScript interfaces in `src/types/cms.ts`.
*(Maintainer Note: Modifying `types/cms.ts` requires updating the Admin Form handlers and the Portfolio.tsx map functions).*

### 2. Localization (i18n) & Layout Direction
- The project relies on `react-i18next` utilizing `en.json` and `ar.json` inside `src/locales/`.
- **Strict Rule:** Absolutely no hardcoded strings in structural components (`ContactSection.tsx`, `HeroSection.tsx`). All text must point to `t('key.subkey')`.
- The layout dynamically adapts to RTL (Right-to-Left) when Arabic is actively selected, gracefully flipping Flexbox margins, paddings, and button arrows via Tailwind's `rtl:` prefixes.

### 3. Dark Theme & Aesthetic Guidelines
- **Theme:** Strict Pure Black Dark Mode. The root uses `hsl(0, 0%, 0%)` for background and `hsl(0, 0%, 100%)` for foreground.
- **Accents:** Neon glows and glassmorphism. Components heavily utilize the `.glass-card` and `.glass-button` utility classes defined in `index.css`.
- **Interactions:** The `<MagneticCursor />` expands dynamically into a hollow spotlight ring when hovering over specific DOM elements (`button`, `a`, `.glass-button`).
- **Global WhatsApp Widget:** Designed as a dark glass orb with a subtle internal green glow, pinned globally in `App.tsx` avoiding interference with the footer.

### 4. Performance & SEO
- **Animations:** Heavy WebGL/Canvas elements (`ParticleGrid.tsx` & `Sparkles.tsx`) are bound to `useInView` Hooks. They instantly pause `requestAnimationFrame` when scrolled out of view to save mobile battery and GPU.
- **Lazy Loading:** Secondary routes (`/admin`, `/portfolio`) are `React.lazy()` loaded in `src/App.tsx`.
- **SEO/Metadata:** Managed via `react-helmet-async` for route-specific meta tags.

---

## 🏗 Future Scaling & Backend Integration (The Next Step)
When scaling to a true database (The recommended stack is **Supabase** or **Firebase**):
1. Navigate to `src/context/CMSContext.tsx`.
2. Swap the `saveItems` function to an async API call pointing to Postgres/Firestore.
3. Update `src/components/admin/ImageUpload.tsx` to upload the raw binary file to an S3/Supabase bucket instead of parsing to Base64, and return the CDN URL.
**Result:** The UI will look and function exactly the same, but the storage limit constraint will disappear.

---

## 🤖 Instructions for Future AI Agents
If you are an AI assistant (Claude, GPT, Gemini) tasked with modifying this project, adhere strictly to the following parameters:
1. **Analyze First:** Check `types/cms.ts` and `App.tsx` to understand the data flow before editing components.
2. **Preserve the Glassmorphism Engine:** Do not introduce generic white `#ffffff` backgrounds or standard Tailwind gray scales. Stick to the CSS variables `var(--background)`, `var(--foreground)`, `var(--accent)`, `var(--neon-blue)`.
3. **Respect i18n:** Do not inject English or Arabic strings directly into `.tsx` files. Always map them to the `src/locales/` JSON dictionaries.
4. **Do Not Break CMS Storage:** If asked to add a new category to the Portfolio, update the arrays in `AdminDashboard.tsx`, `Portfolio.tsx`, and both JSON locales simultaneously to ensure sync.
5. **Code Safely:** Use `useInView` for any new looping animations. Avoid introducing unnecessary `npm` packages where native Tailwind/Framer capabilities suffice.
6. **Explanation Protocol:** Briefly explain assumptions before modifying shared state context files.
