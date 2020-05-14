const ColourMap = {
  snow: "#FFFFFF",
  rain: "#0288D1",
  clear: "#FDD835",
  cloudy: "#9E9E9E",
  hot: "#FF8A65",
  cold: "#4DD0E1",
};

function convertHourToColours(weatherType) {
  return convertHourToLights(weatherType).map(convertToColour);
}

function convertHourToLights(weatherType) {
  if (weatherType === "light_clouds") {
    return ["cloudy", "clear", "cloudy", "clear", "cloudy"];
  } else if (weatherType.slice(0, 6) === "light_") {
    const baseWeatherType = weatherType.slice(6);
    return ["cloudy", baseWeatherType, "cloudy", baseWeatherType, "cloudy"];
  } else {
    return Array(5).fill(weatherType);
  }
}

function convertToColour(weatherType) {
  return ColourMap[weatherType];
}

module.exports = {
  convertToColour,
  convertHourToColours,
};
