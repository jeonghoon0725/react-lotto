import React, { useReducer, useRef } from "react";
import "./App.css";
import LottoList from "./components/LottoList";
import LottoSelector from "./components/LottoSelector";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "SUBMIT": {
      newState = [...state, action.data];
      break;
    }
    case "RESET": {
      newState = [];
      break;
    }
    case "REMOVE": {
      newState = state.filter((item) => item.id !== action.selected);
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const LottoStateContext = React.createContext();
export const LottoDispatchContext = React.createContext();

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const onSubmit = (isAuto, selectedNumbers) => {
    dispatch({
      type: "SUBMIT",
      data: { isAuto, selectedNumbers, id: dataId.current },
    });

    dataId.current += 1;
  };
  
  const onReset = () => {
    dispatch({
      type: "RESET",
    });

    dataId.current = 0;
  };

  const onRemove = (selected) => {
    dispatch({
      type: "REMOVE",
      selected,
    });
    dataId.current -= 1;
  };

  const dispatches = { onSubmit, onReset, onRemove };

  return (
    <LottoStateContext.Provider value={data}>
      <LottoDispatchContext.Provider value={dispatches}>
        <div className="App">
          <LottoSelector />
          <LottoList />
        </div>
      </LottoDispatchContext.Provider>
    </LottoStateContext.Provider>
  );
};

export default App;