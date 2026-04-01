import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        feedlot: resolve(__dirname, 'src/pages/mockup-feedlot.html'),
        frigorifico: resolve(__dirname, 'src/pages/mockup-frigorifico.html')
      }
    }
  }
})
