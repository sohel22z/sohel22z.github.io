import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), cloudflare()],
  optimizeDeps: {
    exclude: ['framer-motion'],
  },
})