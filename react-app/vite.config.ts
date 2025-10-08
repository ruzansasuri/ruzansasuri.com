
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  
  // Base URL - use '/' for Netlify/Vercel since it'll be at the root of its own domain
  base: '/',
  
  // Build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Set to true if you want source maps in production
    
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  
  // Development server options
  server: {
    port: 5173,
    strictPort: false,
    host: true, // Listen on all addresses
  },
  
  // Preview server options (for testing production build locally)
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
  },
})