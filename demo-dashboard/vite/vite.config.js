import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: resolve(import.meta.dirname, '../src'),
  publicDir: resolve(import.meta.dirname, '../data'),
  define: {
    'window.__BUILD_MODE__': JSON.stringify('Vite bundle'),
    'window.__DATA_URL__': JSON.stringify('./projects.json'),
  },
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    fs: { allow: [resolve(import.meta.dirname, '..')] },
  },
});
