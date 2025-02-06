import { Moon, Sun } from "lucide-react";
const Header = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="header">
      <h1 className="title">Color Master</h1>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`theme-button ${isDarkMode ? "dark" : "light"}`}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default Header;
