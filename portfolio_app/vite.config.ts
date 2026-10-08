import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// El repo es pedrogonzaleznunez/home → se publica en /home/
export default defineConfig({
  base: '/home/',
  plugins: [react(), tailwindcss()],
})
