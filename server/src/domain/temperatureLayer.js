const { calculateInnerIndexOfHour } = require("./timeIndexes");

const EmptyLayer = {
  inner: { colours: [] },
  outer: { colours: [] },
};

module.exports.build = (forecast) => {
  if (!forecast) {
    return EmptyLayer;
  }

  return { inner: buildInner(forecast.current) };
};

function buildInner(currentForecastPoint) {
  const degreesCelsius = currentForecastPoint.temp;
  const numberOfLights = Math.floor(Math.abs(degreesCelsius) / 2);
  const colour = degreesCelsius > 0 ? "hot" : "cold";
  return {
    colours: Array(numberOfLights).fill(colour),
    startIndex: calculateStartIndex(currentForecastPoint.dt, numberOfLights),
  };
}

function calculateStartIndex(secondsSinceEpoch, numberOfLights) {
  return calculateInnerIndexOfHour(secondsSinceEpoch) - numberOfLights;
}
