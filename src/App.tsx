import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <div className="input-section">
          <p>Ablaufzeit festlegen</p>
          <input type="number" />
        </div>
        <div className="elapsed-time">
          <p className="elapsed-label">Verstrichene Zeit</p>
          <p className="elapsed-value">00:00:00</p>
        </div>
        <div className="buttons">
          <button>Start</button>
          <button>Stop</button>
          <button>Reset</button>
        </div>
      </div>
    </>
  );
}

export default App;
