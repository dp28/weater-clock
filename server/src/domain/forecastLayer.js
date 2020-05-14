const WeatherType = require("weather-type");
const {
  calculateInnerIndexOfHour,
  HourInSeconds,
  HoursInInnerRing,
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
  const colours = calculateWeatherTypes(forecast);
  return { startIndex, colours };
}

function calculateWeatherTypes({ hourly, current }) {
  return [calculateCurrentHourWeatherTypes(current)].concat(
    calculateHourlyWeatherTypes(hourly, current.dt)
  );
}

function calculateCurrentHourWeatherTypes(currentForecastPoint) {
  const weatherType = calculateWeatherType(currentForecastPoint);
  return weatherType;
}

function calculateHourlyWeatherTypes(hourlyForecasts, currentTime) {
  const startOfHour = currentTime - (currentTime % HourInSeconds);
  const firstIndex = hourlyForecasts.findIndex((_) => _.dt > startOfHour);
  return hourlyForecasts
    .slice(firstIndex, firstIndex + (HoursInInnerRing - 1))
    .map(calculateWeatherType);
}

function calculateWeatherType(forecastPoint) {
  const weatherTypes = forecastPoint.weather
    .map((_) => WeatherType.default.fromString(_.description))
    .filter((_) => _.isSome)
    .map((_) => _.unwrap());

  if (willSnow(weatherTypes)) {
    return lightly(weatherTypes) ? "light_snow" : "snow";
  } else if (willRain(weatherTypes)) {
    return lightly(weatherTypes) ? "light_rain" : "rain";
  } else if (willBeClear(weatherTypes)) {
    return "clear";
  } else {
    return partlyCloudy(weatherTypes) ? "light_clouds" : "cloudy";
  }
}

function willSnow(weatherTypes) {
  return weatherTypes.some(
    (_) =>
      _.precipitation.level > WeatherType.PrecipitationLevel.None &&
      _.precipitation.type === WeatherType.PrecipitationType.Snow
  );
}

function lightly(weatherTypes) {
  return weatherTypes.every(
    (_) => _.precipitation.level <= WeatherType.PrecipitationLevel.Light
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

function partlyCloudy(weatherTypes) {
  return weatherTypes.every(
    (_) => _.clouds.level <= WeatherType.CloudLevel.Broken
  );
}
