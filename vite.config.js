import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Where the site lives on the web.
  //  '/'              -> your own domain, Vercel, Netlify, localhost (the default)
  //  '/your-repo/'    -> a GitHub Pages "project site" (the GitHub Actions workflow sets this for you)
  base: process.env.BASE_PATH || '/',
})
