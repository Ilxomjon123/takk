import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      // with options
      '^/api': {
        target: 'https://api.takk.cafe/api/v1/dashboard/client',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      }
    }
  }
});
