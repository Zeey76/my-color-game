import { useState, useEffect } from "react";
import {
  generateColorOptions,
  rgbToString,
  TARGET_COLORS,
} from "../../utils/ColorUtils";

export const useColorGame = () => {
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
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("colorGameDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("colorGameDarkMode", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("colorGameScore", score);
  }, [score]);

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

  const handleNewGame = () => {
    setLevel(1);
    setScore(0);
    localStorage.removeItem("colorGameLevel");
    startNewGame();
  };

  return {
    targetColor,
    colorOptions,
    score,
    gameStatus,
    showStatus,
    level,
    isCorrect,
    isDarkMode,
    setIsDarkMode,
    handleGuess,
    handleNewGame,
    startNewGame,
  };
};
