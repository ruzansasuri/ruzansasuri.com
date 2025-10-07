import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../dist'), // output goes to root/dist
    emptyOutDir: true,                           // clear dist on each build
  },
  resolve: {
    dedupe: ["react", "react-dom"], // <- important
  },
  base: './',  
});
