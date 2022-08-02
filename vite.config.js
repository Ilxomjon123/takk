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
        // target: 'http://18.117.105.144:8080/api/v1/dashboard/client',
        target: 'https://api.takk.cafe/api/v1/dashboard/client',
        // port: 8080,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      },
      '^/admn': {
        // target: 'http://18.117.105.144:8080/api/v1/dashboard/client',
        target: 'https://api.takk.cafe/api/v1/dashboard/admin',
        // port: 8080,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/admn/, ''),
        secure: false,
        ws: true
      }
    }
  },
  css: { preprocessorOptions: { css: { charset: false } } }
});
