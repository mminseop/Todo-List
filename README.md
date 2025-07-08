# 📝 React Todo List Mini Project

간단한 할일 목록(Todo List) 애플리케이션입니다.  
Vite + React + JSON Server를 사용하여 CRUD, 시간 표시, 명언 가져오기 등의 기능을 구현했습니다.

---

## 📦 설치 및 실행 방법

### 1. 개발 서버 실행
```bash
npm install
npm run dev
```

### 2. JSON Server 실행
```bash
json-server --watch ./src/assets/data/db.json --port 3000
```

### 3. 주요 기능
- 할일 목록 CRUD (추가 / 수정 / 삭제 / 조회)
- 현재 시간 실시간 표시
- 랜덤 명언 API 연동 (https://korean-advice-open-api.vercel.app)
- json-server를 활용한 로컬 데이터 저장
- Custom Hook (useFetch) 활용
- useState, useEffect, useRef 사용
- 모달 UI, 애니메이션, 조건부 렌더링 등 다양한 React 패턴 학습