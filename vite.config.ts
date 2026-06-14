import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: set `base` to your GitHub repository name for GitHub Pages.
// e.g. if your repo is https://github.com/<user>/world-cup-predictor
// then base should be '/world-cup-predictor/'.
export default defineConfig({
  plugins: [react()],
  base: '/world-cup-predictor/',
})
