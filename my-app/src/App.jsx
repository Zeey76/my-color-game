import React, { useState, useEffect } from 'react';
import { Moon, Sun, AlertCircle, Check, Trophy, Zap } from 'lucide-react';

// Utils
const colorUtils = {
  getRandomRGB: () => ({
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  }),

  rgbToString: (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,

  generateSimilarColor: (baseColor, variance = 25) => ({
    r: Math.max(0, Math.min(255, baseColor.r + Math.floor(Math.random() * variance * 2) - variance)),
    g: Math.max(0, Math.min(255, baseColor.g + Math.floor(Math.random() * variance * 2) - variance)),
    b: Math.max(0, Math.min(255, baseColor.b + Math.floor(Math.random() * variance * 2) - variance))
  })
};

// Components
const StatsCard = ({ icon: Icon, label, value, gradient }) => (
  <div className="stats-card">
    <div className="stats-card-header">
      <Icon className={`icon ${gradient === 'yellow' ? 'yellow-text' : 'purple-text'}`} />
      <span className="stats-label">{label}</span>
    </div>
    <div className={`stats-value ${gradient === 'yellow' ? 'yellow-gradient' : 'purple-gradient'}`}>
      {value}
    </div>
  </div>
);

const GameStatus = ({ status, isCorrect }) => (
  <div className={`game-status ${isCorrect ? 'animate-bounce' : 'animate-shake'}`}>
    <div className={`game-status-box ${isCorrect ? 'correct' : 'incorrect'}`}>
      {isCorrect ? <Check className="icon-status" /> : <AlertCircle className="icon-status" />}
      <span className="status-text">{status}</span>
    </div>
  </div>
);

const ColorOption = ({ color, onClick }) => (
  <button
    data-testid="colorOption"
    className="color-option"
    style={{ backgroundColor: color }}
    onClick={onClick}
  />
);

// Game Logic Hook
const useGameLogic = () => {
  const [gameState, setGameState] = useState({
    targetColor: '',
    colorOptions: [],
    score: 0,
    level: 1,
    highScore: 0,
    gameStatus: '',
    showStatus: false,
    isCorrect: false
  });

  const generateColorOptions = (baseRGB) => {
    const options = [colorUtils.rgbToString(baseRGB)];
    while (options.length < 6) {
      const similarColor = colorUtils.generateSimilarColor(baseRGB);
      const colorString = colorUtils.rgbToString(similarColor);
      if (!options.includes(colorString)) {
        options.push(colorString);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const startNewGame = () => {
    const newTargetRGB = colorUtils.getRandomRGB();
    const targetColorString = colorUtils.rgbToString(newTargetRGB);
    setGameState(prev => ({
      ...prev,
      targetColor: targetColorString,
      colorOptions: generateColorOptions(newTargetRGB),
      gameStatus: '',
      showStatus: false,
      isCorrect: false
    }));
  };

  const handleGuess = (color) => {
    setGameState(prev => {
      const isCorrect = color === prev.targetColor;
      const newScore = isCorrect ? prev.score + prev.level : prev.score;
      const newLevel = isCorrect ? prev.level + 1 : Math.max(1, prev.level - 1);
      
      return {
        ...prev,
        score: newScore,
        level: newLevel,
        highScore: Math.max(prev.highScore, newScore),
        gameStatus: isCorrect ? 'Excellent! Keep going!' : 'Wrong! New colors coming up...',
        showStatus: true,
        isCorrect
      };
    });

    setTimeout(startNewGame, isCorrect ? 1500 : 1000);
  };

  return { gameState, startNewGame, handleGuess };
};

// Main Component
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { gameState, startNewGame, handleGuess } = useGameLogic();

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className={`color-game-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="game-content">
        <div className="header">
          <h1 className="game-title">
            Color Master
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="toggle-theme-btn"
          >
            {isDarkMode ? <Sun className="icon" /> : <Moon className="icon" />}
          </button>
        </div>

        <div className="game-grid">
          <div className="left-column">
            <div data-testid="gameInstructions">
              <div className="stats-cards">
                <StatsCard icon={Zap} label="Level" value={gameState.level} gradient="yellow" />
                <StatsCard icon={Trophy} label="Score" value={gameState.score} gradient="purple" />
              </div>
              <p className="instructions-text">
                Match the target color from the options below
              </p>
            </div>

            <div 
              data-testid="colorBox"
              className="color-box"
              style={{ backgroundColor: gameState.targetColor }}
            />
          </div>

          <div className="right-column">
            {gameState.showStatus && (
              <GameStatus status={gameState.gameStatus} isCorrect={gameState.isCorrect} />
            )}

            <div className="color-options">
              {gameState.colorOptions.map((color, index) => (
                <ColorOption key={index} color={color} onClick={() => handleGuess(color)} />
              ))}
            </div>

            <button
              data-testid="newGameButton"
              onClick={() => {
                setGameState(prev => ({ ...prev, score: 0, level: 1 }));
                startNewGame();
              }}
              className="new-game-btn"
            >
              Start New Game
            </button>
          </div>
        </div>
      </div>
</div>)}
export default App
