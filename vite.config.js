import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위한 base 경로 설정
  // 저장소 이름이 'lms-test'인 경우: base: '/lms-test/'
  // 환경 변수로 설정되면 그것을 사용, 없으면 저장소 이름으로 자동 설정
  base: process.env.VITE_BASE_PATH || '/lms-test/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
