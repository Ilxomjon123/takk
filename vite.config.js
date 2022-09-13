import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/],
      // reactivityTransform: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // with options
      '^/api/.*': {
        // target: 'http://18.117.105.144:8080/api/v1/dashboard/client',
        target: 'https://api.takk.cafe/api/v1/dashboard/client',
        // port: 8080,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
      // '^https://api.takk.cafe/api/v1/dashboard/admin/.*': {
      //   // target: 'http://18.117.105.144:8080/api/v1/dashboard/client',
      //   target: 'https://api.takk.cafe/api/v1/dashboard/admin',
      //   // port: 8080,
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\https://api.takk.cafe/api/v1/dashboard/admin/, ''),
      //   secure: false,
      //   ws: true,
      // },
    },
  },
  css: { preprocessorOptions: { css: { charset: false } } },
});
