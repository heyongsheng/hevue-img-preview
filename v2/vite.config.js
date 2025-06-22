import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

import path from 'path'

export default defineConfig({
  plugins: [createVuePlugin()],
  build: {
    outDir: '../dist/v2',
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
