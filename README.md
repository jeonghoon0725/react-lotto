# 🎯 React Lotto

로또 번호를 자동/수동/추천으로 생성하고, 당첨 결과를 확인할 수 있는 리액트 프로젝트입니다.

## 📌 기능

1. **로또 번호 생성기**
    - [ ] 회차 선택: 이전 회차를 선택해 당첨 결과를 바로 확인할 수 있도록
    - [x] 자동: 랜덤 6개 번호 생성
    - [x] 수동: 사용자가 버튼을 클릭하여 6개 번호 선택
    - [ ] 추천: 당첨번호 통계 기반 6개 추천 번호 생성 
    - [ ] 완료: 선택된 번호 저장 (로컬 스토리지 활용)

2. **선택된 번호 리스트**
    - [ ] 사용자가 선택한 로또 번호 5줄까지 출력 (로컬 스토리지 활용)
    - [ ] 당첨 결과 확인: 선택된 번호 저장 (csv 파일 활용)

3. **당첨 결과 확인**
   - [ ] 로또 API를 통해 당첨번호 조회
   - [ ] 선택한 번호와 비교하여 맞춘 개수 표시 (csv 파일 활용)

4. **전체 결과 확인**
   - [ ] 로또 API를 통해 당첨번호 조회
   - [ ] 회차별로 저장된 로또번호와 비교하여 맞춘 개수 표시 (csv 파일 활용)

## 🏗️ 폴더 구조

```
📦 react-lotto
├── 📂 src
│   ├── 📂 animation
│   │   ├── winning-cup.json  # 결과 확인 애니메이션
│   ├── 📂 components
│   │   ├── Button.js  # 공통 버튼
│   │   ├── LottoItem.js  # 선택된 로또번호 리스트
│   │   ├── LottoList.js  # 선택된 로또 리스트
│   │   ├── LottoResult.js  # 당첨 결과 확인
│   │   ├── LottoSelector.js  # 로또번호 생성기
│   ├── 📂 data
│   │   ├── 로또예상번호.csv  # 로또 예상 번호
│   │   ├── 로또당첨번호.csv  # 로또 당첨 번호
│   ├── App.js  # 메인 컴포넌트
│   ├── index.js  # 프로젝트 진입점
│   ├── index.js  # 프로젝트 진입점
├── public
├── package.json
└── README.md
```

## 🚀 실행 방법

### 1️⃣ 프로젝트 클론
```sh
git clone https://github.com/jeonghoon0725/react-lotto.git
cd react-lotto
```

### 2️⃣ 패키지 설치
```sh
npm install
```

### 3️⃣ 프로젝트 실행
```sh
npm start
```

## 🛠️ 사용 기술

- React (Hooks)
- JavaScript (ES6+)
- LocalStorage
- Fetch API (로또 당첨번호 조회)

## 📌 참고 API
- [로또 당첨번호 조회 API](https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=1160)

## 📄 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.

---
✅ **개발자:** [Hoon](https://github.com/jeonghoon0725)  
📅 **최초 작성일:** 2025-03-02