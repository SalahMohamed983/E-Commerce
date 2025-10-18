import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// httpss://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
  server: {
  //   proxy: {
  //     'api/': {
  //       target: 'https://localhost:5187'
  //     , changeOrigin: true,
  //     secure: false
  //     },
  //   },
  }
})  
