import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), glsl({
    include: [
      '**/*.glsl',
      '**/*.vert',
      '**/*.frag',
      '**/*.vs',
      '**/*.fs'
    ],
    exclude: undefined,
    warnDuplicatedImports: true,
    minify: false,
    watch: true
  }),
  ]
})




