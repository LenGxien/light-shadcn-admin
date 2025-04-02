import path from 'node:path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import { setupVitePlugins } from './build/plugins';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: setupVitePlugins(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
