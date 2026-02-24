import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/Geunius/',
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
  },
});
