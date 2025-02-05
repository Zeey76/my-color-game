import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import "./App.css";
import {
  generateColorOptions,
  rgbToString,
  TARGET_COLORS,
} from "./utils/ColorUtils";
import TargetColor from "./components/TargetColor";
import StatusMessage from "./components/StatusMessage";
import ColorOptions from "./components/ColorOptions";

const App = () => {
  // Initialize state with values from localStorage if they exist
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("colorGameScore");
    return savedScore ? parseInt(savedScore) : 0;
  });
  const [gameStatus, setGameStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem("colorGameLevel");
    return savedLevel ? parseInt(savedLevel) : 1;
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("colorGameDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [isCorrect, setIsCorrect] = useState(false);

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("colorGameScore", score);
  }, [score]);

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("colorGameDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Save level to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("colorGameLevel", level);
  }, [level]);

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

  const handleGuess = (color) => {
    setShowStatus(true);
    if (color === targetColor) {
      const newScore = score + level;
      setScore(newScore);
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

  // Reset game and clear stored score
  const handleNewGame = () => {
    setLevel(1);
    setScore(0);
    localStorage.removeItem("colorGameLevel");
    startNewGame();
  };

  useEffect(() => {
    startNewGame();
  }, []);

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
          <TargetColor
            isDarkMode={isDarkMode}
            score={score}
            targetColor={targetColor}
            level={level}
          />

          <div>
            {showStatus && (
              <StatusMessage isCorrect={isCorrect} gameStatus={gameStatus} />
            )}
            <ColorOptions
              colorOptions={colorOptions}
              handleGuess={handleGuess}
              showStatus={showStatus}
            />

            <button
              data-testid="newGameButton"
              className="new-game-button"
              onClick={() => {
                handleNewGame();
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
