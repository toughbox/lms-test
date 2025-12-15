# GitHub Pages 배포 문제 해결

## 문제: main.jsx가 로드됨 (소스 파일이 서빙됨)

이 문제는 GitHub Pages가 빌드된 파일이 아닌 소스 파일을 직접 서빙하고 있을 때 발생합니다.

## 해결 방법

### 1단계: GitHub Pages 설정 확인 및 변경

1. GitHub 저장소로 이동
2. **Settings** 탭 클릭
3. 왼쪽 사이드바에서 **Pages** 클릭
4. **Source** 섹션 확인:
   - ❌ **"Deploy from a branch"**로 되어 있다면 → 이것이 문제입니다!
   - ✅ **"GitHub Actions"**로 변경해야 합니다

5. **Source** 드롭다운에서 **"GitHub Actions"** 선택
6. 저장 (자동으로 저장됨)

### 2단계: GitHub Actions 워크플로우 실행

1. **Actions** 탭으로 이동
2. 왼쪽 사이드바에서 **"Deploy to GitHub Pages"** 워크플로우 선택
3. 오른쪽 상단의 **"Run workflow"** 버튼 클릭
4. 브랜치를 **main**으로 선택
5. **"Run workflow"** 클릭

### 3단계: 배포 완료 대기

1. 워크플로우 실행이 완료될 때까지 대기 (약 1-2분)
2. 모든 단계가 ✅ (초록색)으로 표시되는지 확인
3. 특히 다음 단계들이 성공했는지 확인:
   - ✅ Build
   - ✅ Upload artifact
   - ✅ Deploy to GitHub Pages

### 4단계: 배포 확인

1. **Settings** > **Pages**로 이동
2. **"Your site is live at"** 섹션에서 URL 확인
3. 해당 URL로 접속 (예: `https://toughbox.github.io/lms-test/`)
4. 개발자 도구 (F12) > Network 탭 열기
5. 새로고침 (F5)
6. 로드되는 파일 확인:
   - ✅ 정상: `/lms-test/assets/index-xxx.js` 파일이 로드됨
   - ❌ 문제: `/src/main.jsx` 파일이 로드됨

### 5단계: 브라우저 캐시 클리어

여전히 문제가 있다면:
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`
- 또는 시크릿 모드에서 테스트

## 확인 사항

### 정상 동작 시:
- URL: `https://toughbox.github.io/lms-test/`
- Network 탭에서 `/lms-test/assets/index-xxx.js` 로드
- 콘솔에 404 에러 없음

### 문제가 있을 때:
- URL: `https://toughbox.github.io/lms-test/` 또는 루트
- Network 탭에서 `/src/main.jsx` 로드 시도
- 404 에러 발생

## 중요!

**GitHub Pages Source 설정이 "Deploy from a branch"로 되어 있으면 절대 안 됩니다!**

이 설정은 소스 파일을 직접 서빙하므로:
- Vite 빌드가 실행되지 않음
- React가 작동하지 않음
- `/src/main.jsx` 같은 소스 파일을 찾으려고 함

**반드시 "GitHub Actions"로 설정해야 합니다!**

