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
    port: 3001,
  },
  build: {
    lib: {
      entry: './src/module.tsx',
      name: 'app1Module',      
      fileName: 'module',         
    },
    rollupOptions: {
      output: {
        format: 'umd',            
        name: 'app1Module',
      },
    },
  },
});
