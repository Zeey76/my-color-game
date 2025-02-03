import React, { useState, useEffect } from 'react';
import { Moon, Sun, AlertCircle, Check, Trophy, Zap } from 'lucide-react';
import './App.css';

const getRandomRGB = () => ({
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256)
});

const rgbToString = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

const generateSimilarColor = (baseColor) => {
  const variance = 40;
  return {
    r: Math.max(0, Math.min(255, baseColor.r + Math.floor(Math.random() * variance * 2) - variance)),
    g: Math.max(0, Math.min(255, baseColor.g + Math.floor(Math.random() * variance * 2) - variance)),
    b: Math.max(0, Math.min(255, baseColor.b + Math.floor(Math.random() * variance * 2) - variance))
  };
};

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [level, setLevel] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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
    setGameStatus('');
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
      setGameStatus('Excellent! Keep going!');
      setIsCorrect(true);
      setTimeout(startNewGame, 1500);
    } else {
      setLevel(Math.max(1, level - 1));
      setGameStatus('Wrong! Try again!');
      setIsCorrect(false);
      setTimeout(startNewGame, 1000);
    }
  };

  return (
    <div className={`container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="wrapper">
        <div className="header">
          <h1 className="title">Color Master</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`theme-button ${isDarkMode ? 'dark' : 'light'}`}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="instructions">
          <p>Match the target color shown in the large square by selecting the identical color from the options below. 
             The closer you get, the more points you'll earn. Each correct guess increases your level and score!</p>
        </div>

        <div className="main-content">
          <div>
            <div className="stats-container">
              <div className={`stats-card ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="stats-header">
                  <Zap size={20} color="#F59E0B" />
                  <span>Level</span>
                </div>
                <div className="title">{level}</div>
              </div>
              <div className={`stats-card ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="stats-header">
                  <Trophy size={20} color="#8B5CF6" />
                  <span>Score</span>
                </div>
                <div className="title">{score}</div>
              </div>
            </div>
            <div className="color-box" style={{ backgroundColor: targetColor }} />
          </div>

          <div>
            {showStatus && (
              <div className={`status-message ${isCorrect ? 'success' : 'error'}`}>
                {isCorrect ? (
                  <Check size={24} style={{ marginRight: '0.5rem' }} />
                ) : (
                  <AlertCircle size={24} style={{ marginRight: '0.5rem' }} />
                )}
                <span>{gameStatus}</span>
              </div>
            )}

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

export default ColorGame;