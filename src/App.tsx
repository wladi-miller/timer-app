import "./App.css";
import { useState } from "react";
import { useTimer } from "./useTimer";

function App() {
  const [inputValue, setInputValue] = useState("");
  const { isRunning, formattedTime, applyInputAsTime, start, pause, reset } =
    useTimer();

  const hasValidInput = inputValue.trim() !== "" && Number(inputValue) > 0;

  return (
    <div className="container">
      <div className="input-section">
        <p>Ablaufzeit festlegen</p>
        <input
          type="number"
          step="0.001"
          value={inputValue}
          disabled={isRunning}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isRunning) {
              applyInputAsTime(inputValue);
            }
          }}
        />
      </div>

      <div className="elapsed-time">
        <p className="elapsed-label">Verstrichene Zeit</p>
        <p className="elapsed-value">{formattedTime}</p>
      </div>

      <div className="buttons">
        <button disabled={!hasValidInput} onClick={() => start(inputValue)}>
          Start
        </button>
        <button disabled={!hasValidInput} onClick={pause}>
          Pause
        </button>
        <button disabled={!hasValidInput} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
