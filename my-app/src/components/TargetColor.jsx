import { Trophy, Zap } from "lucide-react";
const TargetColor = ({ isDarkMode, level, score, targetColor }) => {
  return (
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
  );
};

export default TargetColor;
