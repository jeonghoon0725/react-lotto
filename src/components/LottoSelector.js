import { useContext, useState } from "react";
import { LottoStateContext, LottoDispatchContext } from "../App";
import Button from "./Button";

const list = [...Array(45).keys()].map((x) => ({ id: x + 1 }));

const LottoSelector = () => {
  const LOTTO_MAX_COUNT = 6;

  const [state, setState] = useState({
    isAuto: false,
    selectedNumbers: [],
  });

  const lottoList = useContext(LottoStateContext);
  const { onSubmit } = useContext(LottoDispatchContext);

  const handleSelect = (newNum) => {
    if (
      state.selectedNumbers.length >= LOTTO_MAX_COUNT &&
      !state.selectedNumbers.includes(newNum)
    ) {
      alert("최대 6개까지 선택가능합니다.");
      return;
    }
    
    if (typeof newNum === "object") {
      setState({ isAuto: true, selectedNumbers: newNum });
    } else {
      setState({
        isAuto: false,
        selectedNumbers: state.selectedNumbers.includes(newNum)
        ? state.selectedNumbers.filter((item) => item !== newNum)
        : [...state.selectedNumbers, newNum],
      })
    }
  };

  const handleReset = () => {
    setState({
      isAuto: false,
      selectedNumbers: [],
    });
  };

  const handleAuto = () => {
    const randomNumArr = new Set();
    while(randomNumArr.size < 6) {
      randomNumArr.add(Math.floor(Math.random() * 45 + 1));
    }
    
    handleSelect([...randomNumArr]);
  };

  const handleSubmit = () => {
    if (
      state.selectedNumbers.length === LOTTO_MAX_COUNT
      && lottoList.length < 5
    ) {
      onSubmit(state.isAuto, state.selectedNumbers);
      handleReset();

      return;
    }
  };

  return (
    <div className="Selector">
      <div className="cost_tag">
        <span>1,000원</span>
      </div>
      <div className="number_list">
        {list.map((item) => (
          <Button
            key={item.id}
            type={state.selectedNumbers.includes(item.id) ? "positive" : "default"}
            text={item.id}
            onClick={() => handleSelect(item.id)}
          />
        ))}
      </div>
      <div className="control_btn">
        <Button type={"negative"} text={"초기화"} onClick={handleReset} />
        <Button type={"negative"} text={"자동선택"} onClick={handleAuto} />
        <Button type={"negative"} text={"완료"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default LottoSelector;