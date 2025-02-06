import Header from "./Header";
import TargetColor from "./TargetColor";
import ColorOptions from "./ColorOptions";
import StatusMessage from "./StatusMessage";
import { useColorGame } from "./useColorGame";
import { useEffect } from "react";

const ColorGame = () => {
  const {
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
  } = useColorGame();

  useEffect(() => {
    startNewGame();
  }, []);
  return (
    <div className={`container ${isDarkMode ? "dark" : "light"}`}>
      <div className="wrapper">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

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

export default ColorGame;
