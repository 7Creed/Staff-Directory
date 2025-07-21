// import { defineConfig } from 'vite'
// import viteReact from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
// // import { resolve } from 'node:path'
// import path from 'path'

// import { fileURLToPath } from 'url'
// import { dirname } from 'path'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     TanStackRouterVite({ autoCodeSplitting: true }),
//     viteReact(),
//     tailwindcss(),
//   ],
//   test: {
//     globals: true,
//     environment: 'jsdom',
//   },
//   resolve: {
//     alias: {
//       // '@': resolve(__dirname, './src'),
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })

import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
