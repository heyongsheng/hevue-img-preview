import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../dist/v3',
    lib: {
      entry: path.resolve(__dirname, 'index.js'),
      name: 'hevueImgPreview',
      fileName: (format) => `index.js`,
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
        assetFileNames: 'index.css',
      },
    },
  },
})
