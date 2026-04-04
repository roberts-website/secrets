/// node standard dependencies.

import { fileURLToPath } from 'url'
import path              from 'path'

/// external dependencies.

import { defineConfig } from 'vite'
import react            from '@vitejs/plugin-react'
import tailwindcss      from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/// config.

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler']
        ],
      },
    }),
  ],
  server: {
    allowedHosts: ['nonprolixly-unbendable-kena.ngrok-free.dev'],
  }
})
