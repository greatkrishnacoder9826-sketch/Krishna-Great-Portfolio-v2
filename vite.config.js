import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repository name MUST match the GitHub repo: Krishna-Great-Portfolio-v2
export default defineConfig({
  base: '/Krishna-Great-Portfolio-v2/',
  plugins: [react()],
})
