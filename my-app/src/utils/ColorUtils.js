export const TARGET_COLORS = [
  { r: 255, g: 163, b: 109 }, // Soft Peach
  { r: 91, g: 153, b: 117 }, // Sage Green
  { r: 84, g: 138, b: 176 }, // Steel Blue
  { r: 220, g: 174, b: 74 }, // Golden Olive
  { r: 188, g: 129, b: 174 }, // Soft Lavender
  { r: 104, g: 144, b: 145 }, // Dusty Teal
  { r: 213, g: 137, b: 84 }, // Warm Sand
  { r: 145, g: 106, b: 162 }, // Muted Violet
  { r: 130, g: 162, b: 140 }, // Moss Green
  { r: 226, g: 142, b: 120 }, // Light Coral
  { r: 132, g: 157, b: 169 }, // Misty Blue
  { r: 186, g: 153, b: 125 }, // Taupe Brown
  { r: 122, g: 176, b: 161 }, // Soft Mint
  { r: 170, g: 137, b: 169 }, // Warm Mauve
  { r: 186, g: 125, b: 120 }, // Blush Beige
];

export const rgbToString = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

const getRandomRGB = () => ({
  r: Math.floor(Math.random() * 256),
  g: Math.floor(Math.random() * 256),
  b: Math.floor(Math.random() * 256),
});

export const generateColorOptions = (targetColorStr) => {
  const options = [targetColorStr];

  while (options.length < 6) {
    const randomColor = rgbToString(getRandomRGB());
    if (!options.includes(randomColor)) {
      options.push(randomColor);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};


