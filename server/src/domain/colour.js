const ColourMap = {
  snow: "#FFFFFF",
  rain: "#0288D1",
  clear: "#FDD835",
  cloudy: "#9E9E9E",
  hot: "#FF8A65",
  cold: "#4DD0E1",
};

module.exports = {
  convertToColour: (string) => ColourMap[string],
};
