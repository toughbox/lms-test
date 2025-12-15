import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위한 base 경로 설정
  // 저장소 이름에 맞게 수정하세요 (예: '/lms-test/' 또는 실제 저장소 이름)
  // 환경 변수로 설정하거나 직접 저장소 이름을 입력하세요
  base: process.env.VITE_BASE_PATH || '/',
})
