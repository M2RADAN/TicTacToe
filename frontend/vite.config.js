// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        another: resolve(__dirname, 'pages/another/index.html'),
        "500": resolve(__dirname, 'pages/500.html'),
      },
    },
  },
 
})