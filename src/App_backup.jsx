import React, { useState, useEffect } from "react";

// 로또 번호 생성기
const LottoGenerator = ({ onSave }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  // 랜덤 번호 생성 (자동)
  const generateRandomNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    setSelectedNumbers([...numbers].sort((a, b) => a - b));
  };

  // 수동 선택 (버튼 클릭)
  const selectNumber = (num) => {
    setSelectedNumbers((prevNumbers) => {
      let newNumbers;
      if (prevNumbers.includes(num)) {
        newNumbers = prevNumbers.filter((n) => n !== num);
      } else if (prevNumbers.length < 6) {
        newNumbers = [...prevNumbers, num].sort((a, b) => a - b);
      } else {
        return prevNumbers;
      }
      return newNumbers;
    });
  };

  // 선택한 번호 저장
  const saveNumbers = () => {
    onSave(selectedNumbers);
    localStorage.setItem("lottoNumbers", JSON.stringify(selectedNumbers));
  };

  return (
    <div>
      <h2>로또 번호 생성기</h2>
      <button onClick={generateRandomNumbers}>자동 선택</button>
      <div>
        {Array.from({ length: 45 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => selectNumber(num)}
            style={{
              margin: 4,
              backgroundColor: selectedNumbers.includes(num) ? "yellow" : "",
            }}
          >
            {num}
          </button>
        ))}
      </div>
      <h3>선택된 번호: {selectedNumbers.join(", ")}</h3>
      <button onClick={saveNumbers}>결과 보기</button>
    </div>
  );
};

// 선택된 번호 리스트
const LottoNumberList = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const storedNumbers = localStorage.getItem("lottoNumbers");
    if (storedNumbers) {
      setNumbers(JSON.parse(storedNumbers));
    }
  }, []);

  return (
    <div>
      <h2>선택된 번호 리스트</h2>
      <p>{numbers.length > 0 ? numbers.join(", ") : "번호를 선택하세요"}</p>
    </div>
  );
};

// 결과 확인
const LottoResult = () => {
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [userNumbers, setUserNumbers] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const [winningRound, setWinningRound] = useState(0);

  useEffect(() => {
    const fetchWinningNumbers = async (drawNo) => {
      try {
        const response = await fetch(`/common.do?method=getLottoNumber&drwNo=${drawNo}`);
        const data = await response.json();
        
        if(data.returnValue !== "success") {
          setWinningNumbers(['데이터를 불러올 수 없습니다.']);
        } else {
          const winningNums = [
            data.drwtNo1,
            data.drwtNo2,
            data.drwtNo3,
            data.drwtNo4,
            data.drwtNo5,
            data.drwtNo6,
            data.bnusNo,
          ];
          setWinningNumbers(winningNums);
        }
      } catch (error) {
        console.error("당첨 번호 가져오기 오류:", error);
      }
    };

    // 회차 정보 계산
    const defaultRound = 1160;
    const defaultDate = new Date("2025-02-22");
    const today = new Date();
    const diffInMs = today - defaultDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffInDays / 7);
    const targetRound = defaultRound + weeks;
    setWinningRound(targetRound);

    // 당첨번호 가져오기
    fetchWinningNumbers(targetRound);

    // 저장된 사용자 번호 가져오기
    const storedNumbers = localStorage.getItem("lottoNumbers");
    if (storedNumbers) {
      const parsedNumbers = JSON.parse(storedNumbers);
      setUserNumbers(parsedNumbers);
    }
  }, []);

  // 당첨 여부 계산 (당첨 번호가 업데이트된 후)
  useEffect(() => {
    setMatchCount(userNumbers.filter((num) => winningNumbers.includes(num)).length);
  }, [winningNumbers, userNumbers]);

  return (
    <div>
      <h2>결과 확인</h2>
      <p>{winningRound}회 당첨 번호: {winningNumbers.join(", ")}</p>
      <p>내 번호: {userNumbers.join(", ")}</p>
      <p>맞춘 개수: {matchCount}개</p>
    </div>
  );
};

// 메인 앱
const App = () => {
  const [savedNumbers, setSavedNumbers] = useState([]);

  return (
    <div>
      <h1>로또 번호 생성기</h1>
      <LottoGenerator onSave={setSavedNumbers} />
      <LottoNumberList />
      <LottoResult />
    </div>
  );
};

export default App;
