
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            // UI component libraries
            '@radix-ui/react-dialog',
            '@radix-ui/react-separator',
            '@radix-ui/react-tabs',
            '@radix-ui/react-aspect-ratio',
            // Include other UI libraries as needed
          ],
        },
      },
    },
    target: 'esnext',
    assetsInlineLimit: 4096, // 4kb - small files will be inlined
  },
}));
