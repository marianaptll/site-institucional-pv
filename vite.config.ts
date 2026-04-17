import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.mp4', '**/*.mov', '**/*.webm'],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separa React e React-DOM em chunk próprio
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Separa Motion/Framer em chunk próprio (lib grande)
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
            return 'motion-vendor';
          }
          // Separa Radix UI em chunk próprio
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-vendor';
          }
          // Separa MUI em chunk próprio
          if (id.includes('node_modules/@mui') || id.includes('node_modules/@emotion')) {
            return 'mui-vendor';
          }
          // Separa Recharts/charts
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3')) {
            return 'charts-vendor';
          }
          // Separa Leaflet
          if (id.includes('node_modules/leaflet') || id.includes('node_modules/react-leaflet')) {
            return 'map-vendor';
          }
        },
      },
    },
    // Aumenta limite para evitar warnings (chunks de vendor podem ser grandes)
    chunkSizeWarningLimit: 600,
  },

  server: {
    // Força reload completo quando o HMR falha, evitando tela em branco
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
    },
  },
})
