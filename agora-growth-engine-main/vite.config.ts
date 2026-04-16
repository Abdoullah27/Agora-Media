import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    // Raise the warning threshold slightly — we're splitting properly now
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — cached separately, never changes
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Animation library — large, split from app code
          "vendor-framer": ["framer-motion"],
          // i18n — only loaded once, very cacheable
          "vendor-i18n": ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          // Radix UI headless components — stable, rarely changes
          "vendor-radix": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-popover",
          ],
          // Form utilities
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
        },
      },
    },
  },
}));
