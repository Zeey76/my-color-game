const ColorOptions = ({ colorOptions, showStatus, handleGuess }) => {
  return (
    <div>
      <p className="color-label">Select the matching color:</p>
      <div className="options-grid">
        {colorOptions.map((color, index) => (
          <button
            data-testid="colorOption"
            key={index}
            disabled={showStatus}
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorOptions;
