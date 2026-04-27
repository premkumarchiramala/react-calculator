import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history + theme when app starts
  useEffect(() => {
    const savedHistory = localStorage.getItem("history");
    const savedTheme = localStorage.getItem("darkMode");

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );
  }, [history]);

  // Save dark mode whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  const addValue = (value) => {
    setInput((prev) => prev + value);
  };

  const clearAll = () => {
    setInput("");
  };

  const removeLast = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const calculate = () => {
    if (!input.trim()) {
      setInput("0");
      return;
    }

    try {
      const result = Function(
        '"use strict"; return (' + input + ")"
      )();

      if (
        result === undefined ||
        result === null ||
        Number.isNaN(result)
      ) {
        setInput("0");
        return;
      }

      const historyItem = `${input} = ${result}`;

      setHistory((prev) => [historyItem, ...prev]);

      setInput(String(result));
    } catch {
      setInput("0");
    }
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div className="calculator">
        <div className="header">
          <h2>Calculator</h2>

          <label className="toggle">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="display">
          {input || "0"}
        </div>

        <div className="button-grid">
          <button
            className="ac-btn"
            onClick={clearAll}
          >
            AC
          </button>

          <button onClick={removeLast}>
            DEL
          </button>

          <button onClick={() => addValue("%")}>
            %
          </button>

          <button onClick={() => addValue("/")}>
            ÷
          </button>

          <button onClick={() => addValue("7")}>
            7
          </button>

          <button onClick={() => addValue("8")}>
            8
          </button>

          <button onClick={() => addValue("9")}>
            9
          </button>

          <button onClick={() => addValue("*")}>
            ×
          </button>

          <button onClick={() => addValue("4")}>
            4
          </button>

          <button onClick={() => addValue("5")}>
            5
          </button>

          <button onClick={() => addValue("6")}>
            6
          </button>

          <button onClick={() => addValue("-")}>
            −
          </button>

          <button onClick={() => addValue("1")}>
            1
          </button>

          <button onClick={() => addValue("2")}>
            2
          </button>

          <button onClick={() => addValue("3")}>
            3
          </button>

          <button onClick={() => addValue("+")}>
            +
          </button>

          <button onClick={() => addValue("0")}>
            0
          </button>

          <button onClick={() => addValue(".")}>
            .
          </button>

          <button
            className="equal-btn"
            onClick={calculate}
          >
            =
          </button>

          <button
            className="history-btn"
            onClick={() => setShowHistory(true)}
          >
            H
          </button>
        </div>
      </div>

      {showHistory && (
        <div className="history-overlay">
          <div className="history-panel">
            <div className="history-header">
              <h3>History</h3>

              <button
                className="close-btn"
                onClick={() => setShowHistory(false)}
              >
                ✕
              </button>
            </div>

            <div className="history-list">
              {history.length === 0 ? (
                <div className="empty-history">
                  No Calculations Yet
                </div>
              ) : (
                history.map((item, index) => (
                  <div
                    className="history-item"
                    key={index}
                  >
                    {item}
                  </div>
                ))
              )}
            </div>

            <button
              className="clear-history-btn"
              onClick={clearHistory}
            >
              Clear History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
