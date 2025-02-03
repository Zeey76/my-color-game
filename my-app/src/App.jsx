import React, { useState, useEffect } from "react";
import { Moon, Sun, AlertCircle, Check, Trophy, Zap } from "lucide-react";

// Previous helper functions remain unchanged
const getRandomRGB = () => ({
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256),
});

const rgbToString = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

const generateSimilarColor = (baseColor) => {
  const variance = 25;
  return {
    r: Math.max(
      0,
      Math.min(
        255,
        baseColor.r + Math.floor(Math.random() * variance * 2) - variance
      )
    ),
    g: Math.max(
      0,
      Math.min(
        255,
        baseColor.g + Math.floor(Math.random() * variance * 2) - variance
      )
    ),
    b: Math.max(
      0,
      Math.min(
        255,
        baseColor.b + Math.floor(Math.random() * variance * 2) - variance
      )
    ),
  };
};

const styles = {
  container: {
    minHeight: "100vh",
    transition: "background-color 0.3s",
  },
  darkMode: {
    backgroundColor: "#111827",
    color: "white",
  },
  lightMode: {
    backgroundColor: "#F9FAFB",
    color: "#111827",
  },
  wrapper: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "1.5rem",
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: "bold",
    background: "linear-gradient(to right, #8B5CF6, #EC4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  themeButton: {
    padding: "0.5rem",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "2rem",
    "@media (min-width: 1024px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  statsContainer: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  statsCard: {
    flex: 1,
    padding: "1rem",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  colorBox: {
    width: "100%",
    aspectRatio: "1",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
    ":hover": {
      transform: "scale(1.02)",
    },
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
  colorOption: {
    width: "100%",
    aspectRatio: "1",
    borderRadius: "0.75rem",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s",
    ":hover": {
      transform: "scale(1.05)",
    },
  },
  newGameButton: {
    width: "100%",
    marginTop: "1.5rem",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    background: "linear-gradient(to right, #8B5CF6, #EC4899)",
    color: "white",
    fontWeight: "500",
    cursor: "pointer",
    transition: "transform 0.3s",
    ":hover": {
      transform: "scale(1.02)",
    },
  },
  statusMessage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
  },
};

// Component implementation remains the same
const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [level, setLevel] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const generateColorOptions = (baseRGB) => {
    const options = [rgbToString(baseRGB)];
    while (options.length < 6) {
      const similarColor = generateSimilarColor(baseRGB);
      const colorString = rgbToString(similarColor);
      if (!options.includes(colorString)) {
        options.push(colorString);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const startNewGame = () => {
    const newTargetRGB = getRandomRGB();
    const targetColorString = rgbToString(newTargetRGB);
    setTargetColor(targetColorString);
    setColorOptions(generateColorOptions(newTargetRGB));
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
      setHighScore(Math.max(highScore, score + level));
      setTimeout(startNewGame, 1500);
    } else {
      setLevel(Math.max(1, level - 1));
      setGameStatus("Wrong! New colors coming up...");
      setIsCorrect(false);
      setTimeout(startNewGame, 1000);
    }
  };

  return (
    <div
      style={{
        ...styles.container,
        ...(isDarkMode ? styles.darkMode : styles.lightMode),
      }}
    >
      <div style={styles.wrapper}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Color Master</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              ...styles.themeButton,
              backgroundColor: isDarkMode ? "#1F2937" : "#E5E7EB",
              color: isDarkMode ? "#FBBF24" : "#111827",
            }}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div style={styles.contentGrid}>
          <div>
            <div style={styles.statsContainer}>
              <div
                style={{
                  ...styles.statsCard,
                  backgroundColor: isDarkMode ? "#1F2937" : "white",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Zap size={20} color="#F59E0B" />
                  <span style={{ fontWeight: "600" }}>Level</span>
                </div>
                <div style={styles.title}>{level}</div>
              </div>
              <div
                style={{
                  ...styles.statsCard,
                  backgroundColor: isDarkMode ? "#1F2937" : "white",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Trophy size={20} color="#8B5CF6" />
                  <span style={{ fontWeight: "600" }}>Score</span>
                </div>
                <div style={styles.title}>{score}</div>
              </div>
            </div>

            <div
              style={{ ...styles.colorBox, backgroundColor: targetColor }}
              data-testid="colorBox"
            />
          </div>

          <div>
            {showStatus && (
              <div
                style={{
                  ...styles.statusMessage,
                  backgroundColor: isCorrect
                    ? "rgba(34, 197, 94, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
                  color: isCorrect ? "#22C55E" : "#EF4444",
                }}
                data-testid="gameStatus"
              >
                {isCorrect ? (
                  <Check size={24} style={{ marginRight: "0.5rem" }} />
                ) : (
                  <AlertCircle size={24} style={{ marginRight: "0.5rem" }} />
                )}
                <span>{gameStatus}</span>
              </div>
            )}

            <div style={styles.optionsGrid}>
              {colorOptions.map((color, index) => (
                <button
                  key={index}
                  style={{ ...styles.colorOption, backgroundColor: color }}
                  onClick={() => handleGuess(color)}
                  data-testid="colorOption"
                />
              ))}
            </div>

            <button
              style={styles.newGameButton}
              onClick={() => {
                setLevel(1);
                setScore(0);
                startNewGame();
              }}
              data-testid="newGameButton"
            >
              Start New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorGame;
