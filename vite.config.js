import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  assetsInclude: ['**/*.glb'],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'three-core';
            if (id.includes('@react-three')) return 'r3f';
            if (id.includes('framer-motion') || id.includes('lenis')) return 'framer';
            if (id.includes('gsap')) return 'gsap';
            return 'vendor';
          }
        }
      },
    },
  },
})