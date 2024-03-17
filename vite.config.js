import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        chapter1: resolve(__dirname, 'index.html'),
        chapter2: resolve(__dirname, 'chapter2.html'),
        chapter3: resolve(__dirname, 'chapter3.html'),
      },
    },
  },
})
