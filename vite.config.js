import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위한 base 경로 설정
  // 저장소 이름이 'lms-test'인 경우: base: '/lms-test/'
  // 루트 도메인에 배포하는 경우: base: '/'
  base: process.env.NODE_ENV === 'production' ? '/lms-test/' : '/',
})
