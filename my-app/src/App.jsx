import { useState, useEffect } from "react";
import { Moon, Sun, AlertCircle, Check, Trophy, Zap } from "lucide-react";
import "./App.css";

const TARGET_COLORS = [
  { r: 255, g: 163, b: 109 }, // Soft Peach
  { r: 91, g: 153, b: 117 }, // Sage Green
  { r: 84, g: 138, b: 176 }, // Steel Blue
  { r: 220, g: 174, b: 74 }, // Golden Olive
  { r: 188, g: 129, b: 174 }, // Soft Lavender
  { r: 104, g: 144, b: 145 }, // Dusty Teal
  { r: 213, g: 137, b: 84 }, // Warm Sand
  { r: 145, g: 106, b: 162 }, // Muted Violet
  { r: 130, g: 162, b: 140 }, // Moss Green
  { r: 226, g: 142, b: 120 }, // Light Coral
  { r: 132, g: 157, b: 169 }, // Misty Blue
  { r: 186, g: 153, b: 125 }, // Taupe Brown
  { r: 122, g: 176, b: 161 }, // Soft Mint
  { r: 170, g: 137, b: 169 }, // Warm Mauve
  { r: 186, g: 125, b: 120 }, // Blush Beige
];

const rgbToString = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

const getRandomRGB = () => ({
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256),
});

const generateColorOptions = (targetColorStr) => {
  const options = [targetColorStr];

  while (options.length < 6) {
    const randomColor = rgbToString(getRandomRGB());
    if (!options.includes(randomColor)) {
      options.push(randomColor);
    }
  }

  return options.sort(() => Math.random() - 0.5);
};

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
      setTimeout(startNewGame, 3000);
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
          <p>
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
                <div className="title">{score}</div>
              </div>
            </div>
            <div
              className="color-box"
              style={{ backgroundColor: targetColor }}
            />
          </div>

          <div>
            {showStatus && (
              <div
                className={`status-message ${isCorrect ? "success animate-bounce" : "error animate-shake"}`}
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
                    key={index}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => handleGuess(color)}
                  />
                ))}
              </div>
            </div>

            <button
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
