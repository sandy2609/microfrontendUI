import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const timestamp = new Date().getTime();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
    port: 3002,
  },
  build: {
    lib: {
      entry: './src/module.tsx', 
      name: 'App2Module',   
      fileName: 'module',        
    },
    rollupOptions: {
      output: {
        format: 'umd',            
        name: 'App2Module',
      },
    },
  },
});
