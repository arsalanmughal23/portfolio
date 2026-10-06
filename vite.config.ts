import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 👈 Import Tailwind

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 Add Tailwind plugin
  ],
  server: {
    allowedHosts: ['.devtunnels.ms'], // 👈 This fixes your 502 Dev Tunnel error
  },
})