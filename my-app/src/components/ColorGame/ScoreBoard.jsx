import { Zap, Trophy } from "lucide-react";

const ScoreBoard = ({ isDarkMode, level, score }) => {
  return (
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
  );
};

export { ScoreBoard };
