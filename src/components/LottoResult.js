import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LottoDispatchContext, LottoStateContext } from "../App";

import Button from "./Button";
import LottoItem from "./LottoItem";

import useWinningNumber from "../hooks/LottoWinningNumber";
import { changeColor } from "../utils/LottoColor";

const LottoResult = () => {
  const lottoList = useContext(LottoStateContext);
  const { onReset } = useContext(LottoDispatchContext);

  const { winningNumbers, winningRound, loading, error } = useWinningNumber();
  
  const navigate = useNavigate();

  return (
    <div className="LottoResult">
        <div className="header">
            <span>구매복권 당첨결과</span>
        </div>
        <div className="winning_number_wrapper">
          <span>{winningRound}회차 당첨번호</span>
          <div className="winning_number">
            {loading ? (
              <span>로딩 중...</span>
            ) : error ? (
              <span className="error">{error}</span>
            ) : (
              winningNumbers
                .sort((a, b) => a - b)
                .map((num) => (
                  <span key={num} className={changeColor(num)}>
                    {num}
                  </span>
                ))
            )}
          </div>
        </div>
        <div className="lotto_list">        
            {lottoList.map((item) => (
              <LottoItem
                key={item.id}
                isDeleteBtnHide={true}
                winningNumber={winningNumbers}
                {...item}
              />
            ))}
        </div>
        <div className="result_btn">
          <Button
            text={"다시하기"}
            type={"positive"}
            onClick={() => {
              onReset();
              navigate("/", { replace: true });
            }}
          />
        </div>
    </div>
  );
};

export default LottoResult;