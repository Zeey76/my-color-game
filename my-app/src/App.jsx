import { useState, useEffect } from "react";
import { Moon, Sun, AlertCircle, Check, Trophy, Zap } from "lucide-react";
import "./App.css";
import {
  generateColorOptions,
  rgbToString,
  TARGET_COLORS,
} from "./components/ColorUtils";

const App = () => {
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [level, setLevel] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const startNewGame = () => {
    const targetRGB =
      TARGET_COLORS[Math.floor(Math.random() * TARGET_COLORS.length)];
    const targetColorString = rgbToString(targetRGB);
    setTargetColor(targetColorString);
    setColorOptions(generateColorOptions(targetColorString));
    setGameStatus("");
    setShowStatus(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = (color) => {
    setShowStatus(true);
    if (color === targetColor) {
      setScore(score + level);
      setLevel(level + 1);
      setGameStatus("Excellent! Keep going!");
      setIsCorrect(true);
      setTimeout(startNewGame, 2000);
    } else {
      setLevel(Math.max(1, level - 1));
      setGameStatus("Wrong! New colors coming up!");
      setIsCorrect(false);
      setTimeout(startNewGame, 1000);
    }
  };

  return (
    <div className={`container ${isDarkMode ? "dark" : "light"}`}>
      <div className="wrapper">
        <div className="header">
          <h1 className="title">Color Master</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`theme-button ${isDarkMode ? "dark" : "light"}`}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="instructions">
          <p data-testid="gameInstructions">
            Match the target color shown in the large square by selecting the
            identical color from the options below. The closer you get, the more
            points you&apos;ll earn. Each correct guess increases your level and
            score!
          </p>
        </div>

        <div className="main-content">
          <div>
            <div className="stats-container">
              <div className={`stats-card ${isDarkMode ? "dark" : "light"}`}>
                <div className="stats-header">
                  <Zap size={20} color="#F59E0B" />
                  <span>Level</span>
                </div>
                <div className="title">{level}</div>
              </div>
              <div className={`stats-card ${isDarkMode ? "dark" : "light"}`}>
                <div className="stats-header">
                  <Trophy size={20} color="#8B5CF6" />
                  <span>Score</span>
                </div>
                <div data-testid="score" className="title">
                  {score}
                </div>
              </div>
            </div>
            <div
              className="color-box"
              data-testid="colorBox"
              style={{ backgroundColor: targetColor }}
            />
          </div>

          <div>
            {showStatus && (
              <div
                data-testid="gameStatus"
                className={`status-message ${
                  isCorrect ? "success animate-bounce" : "error animate-shake"
                }`}
              >
                {isCorrect ? (
                  <Check size={24} style={{ marginRight: "0.5rem" }} />
                ) : (
                  <AlertCircle size={24} style={{ marginRight: "0.5rem" }} />
                )}
                <span>{gameStatus}</span>
              </div>
            )}
            <div>
              <p className="color-label">Select the matching color:</p>
              <div className="options-grid">
                {colorOptions.map((color, index) => (
                  <button
                    data-testid="colorOption"
                    key={index}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => handleGuess(color)}
                  />
                ))}
              </div>
            </div>

            <button
              data-testid="newGameButton"
              className="new-game-button"
              onClick={() => {
                setLevel(1);
                setScore(0);
                startNewGame();
              }}
            >
              Start New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
