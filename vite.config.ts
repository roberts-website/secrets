/// external dependencies.

import react            from '@vitejs/plugin-react'
import tailwindcss      from '@tailwindcss/vite'
import { defineConfig } from 'vite'

/// config.

// https://vite.dev/config/
export default defineConfig({
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
})
