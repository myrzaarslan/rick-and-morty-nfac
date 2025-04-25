import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://rickandmortyapi.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        timeout: 10000,
        proxyTimeout: 10000,
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});