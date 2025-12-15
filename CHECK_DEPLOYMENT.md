# 배포 상태 확인 체크리스트

## 현재 증상
- `main.jsx` - 404 에러
- `vite.svg` - 404 에러
- 소스 파일을 찾으려고 함 (빌드된 파일이 아님)

## 확인해야 할 사항

### ✅ 1. GitHub Pages 설정 확인

**반드시 확인:**
1. GitHub 저장소 > **Settings** > **Pages**
2. **Source** 섹션 확인
3. **"GitHub Actions"**로 설정되어 있어야 함
4. **"Deploy from a branch"**로 되어 있으면 안 됨!

### ✅ 2. GitHub Actions 실행 확인

1. **Actions** 탭으로 이동
2. 최신 워크플로우 실행 확인
3. 상태 확인:
   - ✅ 초록색 체크 = 성공
   - ❌ 빨간색 X = 실패 (로그 확인 필요)
   - 🟡 노란색 원 = 진행 중

### ✅ 3. 빌드 로그 확인

워크플로우를 클릭하여 다음 단계 확인:

1. **Build** 단계:
   - "List dist contents" 확인
   - `index.html` 파일이 있는지 확인
   - `assets/` 폴더가 있는지 확인

2. **Upload artifact** 단계:
   - 성공했는지 확인

3. **Deploy to GitHub Pages** 단계:
   - 성공했는지 확인

### ✅ 4. 수동 재배포

위 설정이 모두 맞다면:

1. **Actions** 탭
2. 왼쪽에서 **"Deploy to GitHub Pages"** 선택
3. 오른쪽 상단 **"Run workflow"** 클릭
4. 브랜치: **main**
5. **"Run workflow"** 클릭
6. 완료될 때까지 대기 (1-2분)

### ✅ 5. 브라우저 확인

배포 완료 후:

1. **강력 새로고침**: `Ctrl + Shift + R` (Windows) 또는 `Cmd + Shift + R` (Mac)
2. 개발자 도구 (F12) > **Network** 탭
3. 새로고침
4. 확인:
   - ✅ 정상: `/lms-test/assets/index-xxx.js` 로드
   - ❌ 문제: `/src/main.jsx` 또는 `/main.jsx` 로드

## 문제가 계속되면

### GitHub Actions 로그 확인

1. **Actions** 탭
2. 실패한 워크플로우 클릭
3. 빨간색 X가 있는 단계 클릭
4. 로그 확인:
   - 빌드 에러가 있는지
   - 파일이 제대로 생성되었는지

### 수동 빌드 테스트

로컬에서:
```bash
npm run build
cat dist/index.html
```

빌드된 `index.html`에 `/lms-test/assets/index-xxx.js`가 있어야 함

## 가장 흔한 원인

**GitHub Pages Source가 "Deploy from a branch"로 설정되어 있음**

이 경우:
- 소스 파일을 직접 서빙
- 빌드가 실행되지 않음
- `/src/main.jsx` 같은 파일을 찾으려고 함

**해결: 반드시 "GitHub Actions"로 변경!**

