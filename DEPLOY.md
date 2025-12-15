# GitHub Pages 배포 가이드

## 설정 방법

### 1. 저장소 이름 확인
현재 저장소 이름을 확인하고 `vite.config.js`의 `base` 경로를 수정하세요.

```javascript
// vite.config.js
base: '/저장소이름/'  // 예: '/lms-test/'
```

### 2. GitHub 저장소 생성 및 푸시

```bash
# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소 추가
git remote add origin https://github.com/사용자명/저장소이름.git
git branch -M main
git push -u origin main
```

### 3. GitHub Pages 설정

1. GitHub 저장소로 이동
2. Settings > Pages 메뉴 클릭
3. Source에서 "GitHub Actions" 선택
4. 저장하면 자동으로 배포가 시작됩니다

### 4. 배포 확인

배포가 완료되면 다음 URL로 접속할 수 있습니다:
- `https://사용자명.github.io/저장소이름/`

## 자동 배포

`.github/workflows/deploy.yml` 파일이 설정되어 있어서:
- `main` 브랜치에 푸시할 때마다 자동으로 빌드 및 배포됩니다
- Actions 탭에서 배포 상태를 확인할 수 있습니다

## 수동 배포 (대안)

GitHub Actions 대신 수동으로 배포하려면:

```bash
npm run build
# dist 폴더를 gh-pages 브랜치에 푸시하거나
# GitHub Pages 설정에서 dist 폴더를 루트로 지정
```

## 문제 해결

### 빌드 실패 시
- Actions 탭에서 로그 확인
- 로컬에서 `npm run build` 테스트

### 경로 문제 시
- `vite.config.js`의 `base` 경로 확인
- 저장소 이름과 일치하는지 확인

### 라이브러리 로딩 실패 시
- `node_modules`가 커밋되었는지 확인
- GitHub Pages는 정적 파일만 서빙하므로 빌드된 파일이 필요합니다

