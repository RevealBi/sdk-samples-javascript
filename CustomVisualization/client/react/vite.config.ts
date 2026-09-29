import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // reveal-sdk ships as a single large module
    chunkSizeWarningLimit: 20000,
  },
})
