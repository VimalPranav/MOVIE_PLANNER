import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api/": "https://movie-planner-backend.onrender.com",
      "/uploads/": "https://movie-planner-backend.onrender.com",
    }
  }
})