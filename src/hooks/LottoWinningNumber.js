import { useState, useEffect } from "react";

const useWinningNumber = () => {
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [userNumbers, setUserNumbers] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const [winningRound, setWinningRound] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWinningNumbers = async (drawNo) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/common.do?method=getLottoNumber&drwNo=${drawNo}`
        );

        if (!response.ok) {
          throw new Error("API 요청 실패");
        }

        const data = await response.json();
        console.log(data)
        if (data.returnValue !== "success") {
          throw new Error("데이터를 불러올 수 없습니다.");
        }

        const winningNums = [
          data.drwtNo1,
          data.drwtNo2,
          data.drwtNo3,
          data.drwtNo4,
          data.drwtNo5,
          data.drwtNo6,
        ];
        setWinningNumbers(winningNums);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // 🔹 회차 정보 계산
    const defaultRound = 1160;
    const defaultDate = new Date("2025-02-22");
    const today = new Date();
    const diffInMs = today - defaultDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffInDays / 7);
    const targetRound = defaultRound + weeks;
    setWinningRound(targetRound);

    // 🔹 API에서 당첨번호 가져오기
    fetchWinningNumbers(targetRound);

    // 🔹 저장된 사용자 번호 가져오기
    const storedNumbers = localStorage.getItem("lottoNumbers");
    if (storedNumbers) {
      setUserNumbers(JSON.parse(storedNumbers));
    }
  }, []);

  // 🔹 당첨 여부 계산
  useEffect(() => {
    setMatchCount(userNumbers.filter((num) => winningNumbers.includes(num)).length);
  }, [winningNumbers, userNumbers]);

  return { winningNumbers, winningRound, matchCount, loading, error };
};

export default useWinningNumber;
