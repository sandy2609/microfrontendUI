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
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]_${timestamp}.js`,
        chunkFileNames: `assets/[name]-[hash]_${timestamp}.js`,
        assetFileNames: `assets/[name]-[hash]_${timestamp}[extname]`,
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },
});
