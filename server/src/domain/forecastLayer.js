const WeatherType = require("weather-type");
const {
  calculateInnerIndexOfHour,
  HourInSeconds,
  HoursInInnerRing,
  InnerLightsPerHour,
} = require("./timeIndexes");

const EmptyLayer = {
  inner: { colours: [] },
  outer: { colours: [] },
};

module.exports.build = (forecast) => {
  if (!forecast) {
    return EmptyLayer;
  }

  return { inner: buildInner(forecast) };
};

function buildInner(forecast) {
  const startIndex = calculateInnerIndexOfHour(forecast.current.dt);
  const colours = calculateColours(forecast);
  return { startIndex, colours };
}

function calculateColours({ hourly, current }) {
  return calculateCurrentHourColours(current).concat(
    calculateHourlyColours(hourly, current.dt)
  );
}

function calculateCurrentHourColours(currentForecastPoint) {
  const colour = calculateColour(currentForecastPoint);
  return Array(InnerLightsPerHour).fill(colour);
}

function calculateHourlyColours(hourlyForecasts, currentTime) {
  const startOfHour = currentTime - (currentTime % HourInSeconds);
  const firstIndex = hourlyForecasts.findIndex((_) => _.dt > startOfHour);
  return hourlyForecasts
    .slice(firstIndex, firstIndex + (HoursInInnerRing - 1))
    .map(calculateColour)
    .flatMap((colour) => Array(InnerLightsPerHour).fill(colour));
}

function calculateColour(forecastPoint) {
  const weatherTypes = forecastPoint.weather
    .map((_) => WeatherType.default.fromString(_.description))
    .filter((_) => _.isSome)
    .map((_) => _.unwrap());

  if (willSnow(weatherTypes)) {
    return "snow";
  } else if (willRain(weatherTypes)) {
    return "rain";
  } else if (willBeClear(weatherTypes)) {
    return "clear";
  } else {
    return "cloudy";
  }
}

function willSnow(weatherTypes) {
  return weatherTypes.some(
    (_) =>
      _.precipitation.level > WeatherType.PrecipitationLevel.None &&
      _.precipitation.type === WeatherType.PrecipitationType.Snow
  );
}

function willRain(weatherTypes) {
  return weatherTypes.some(
    (_) => _.precipitation.level > WeatherType.PrecipitationLevel.None
  );
}

function willBeClear(weatherTypes) {
  return weatherTypes.every((_) => _.clouds.isClear());
}
