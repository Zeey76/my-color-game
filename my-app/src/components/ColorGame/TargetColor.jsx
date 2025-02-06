import { ScoreBoard } from "./ScoreBoard";
const TargetColor = ({ isDarkMode, level, score, targetColor }) => {
  return (
    <div>
      <ScoreBoard isDarkMode={isDarkMode} level={level} score={score} />
      <div
        className="color-box"
        data-testid="colorBox"
        style={{ backgroundColor: targetColor }}
      />
    </div>
  );
};

export default TargetColor;
