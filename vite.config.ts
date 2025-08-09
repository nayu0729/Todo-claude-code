import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Todo-claude-code/', // リポジトリ名を指定
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})