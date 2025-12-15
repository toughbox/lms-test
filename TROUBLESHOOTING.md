# 문제 해결 가이드

## GitHub Pages 404 에러 해결

### 증상
- `GET https://toughbox.github.io/src/main.jsx net::ERR_ABORTED 404`
- 빌드된 파일이 아닌 소스 파일을 찾으려고 함

### 원인
GitHub Actions가 제대로 실행되지 않았거나, 빌드된 파일이 배포되지 않았을 수 있습니다.

### 해결 방법

#### 1. GitHub Actions 확인
1. GitHub 저장소로 이동
2. **Actions** 탭 클릭
3. 최신 워크플로우 실행 확인
4. 빌드가 성공했는지 확인
5. "List dist contents" 단계에서 `index.html`이 있는지 확인

#### 2. GitHub Pages 설정 확인
1. 저장소 **Settings** > **Pages** 이동
2. **Source**가 **"GitHub Actions"**로 설정되어 있는지 확인
3. 만약 **"Deploy from a branch"**로 되어 있다면 **"GitHub Actions"**로 변경

#### 3. 워크플로우 수동 실행
1. **Actions** 탭으로 이동
2. 왼쪽 사이드바에서 **"Deploy to GitHub Pages"** 선택
3. **"Run workflow"** 버튼 클릭
4. 브랜치 선택 (보통 `main`)
5. **"Run workflow"** 클릭

#### 4. 브라우저 캐시 클리어
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`
- 또는 개발자 도구 (F12) > Network 탭 > "Disable cache" 체크

#### 5. 배포 확인
배포가 완료되면:
- URL: `https://toughbox.github.io/lms-test/`
- 개발자 도구 콘솔에서 에러 확인
- Network 탭에서 로드되는 파일 확인 (빌드된 `assets/index-xxx.js` 파일이 로드되어야 함)

### 예상되는 정상 동작
빌드가 성공하면:
- `dist/index.html`에 `/lms-test/assets/index-xxx.js` 경로가 포함됨
- `/src/main.jsx`를 찾지 않음
- 모든 리소스가 `/lms-test/` 경로 하위에 있음

### 여전히 문제가 있다면
1. GitHub Actions 로그 전체 확인
2. 빌드 단계에서 에러가 있는지 확인
3. "Upload artifact" 단계가 성공했는지 확인
4. "Deploy to GitHub Pages" 단계가 성공했는지 확인

