const WeatherType = require("weather-type");

const EmptyLayer = {
  inner: { colours: [] },
  outer: { colours: [] },
};

const HourInSeconds = 60 * 60;
const HalfDayInSeconds = 12 * HourInSeconds;
const InnerLightsPerHour = 5;
const SecondsPerLight = HourInSeconds / InnerLightsPerHour;

module.exports.build = async (weatherRepository, location) => {
  const weather = await weatherRepository.get(location);

  if (!weather) {
    return EmptyLayer;
  }

  return { inner: buildInner(weather) };
};

function buildInner(forecast) {
  const startIndex = calculateStartIndex(forecast.current.dt);
  const colours = calculateColours(forecast);
  return { startIndex, colours };
}

function calculateStartIndex(secondsSinceEpoch) {
  const secondsToday = secondsSinceEpoch % HalfDayInSeconds;
  return Math.floor(secondsToday / SecondsPerLight);
}

function calculateColours({ hourly, current }) {
  return calculateCurrentHourColours(current)
    .concat(calculateHourlyColours(hourly, current.dt))
    .slice(0, 60);
}

function calculateCurrentHourColours(currentForecastPoint) {
  const colour = calculateColour(currentForecastPoint);
  const repeatsUntilNextHour =
    Math.floor((currentForecastPoint.dt % HourInSeconds) / SecondsPerLight) - 1;
  return Array(repeatsUntilNextHour).fill(colour);
}

function calculateHourlyColours(hourlyForecasts, currentTime) {
  const firstIndex = hourlyForecasts.findIndex((_) => _.dt > currentTime);
  return hourlyForecasts
    .slice(firstIndex, firstIndex + 12)
    .map(calculateColour)
    .flatMap((colour) => Array(5).fill(colour));
}

function calculateColour(forecastPoint) {
  const weatherTypes = forecastPoint.weather
    .map((_) => WeatherType.default.fromString(_.description))
    .filter((_) => _.isSome)
    .map((_) => _.unwrap());

  if (willSnow(weatherTypes)) {
    return "white";
  } else if (willRain(weatherTypes)) {
    return "blue";
  } else if (willBeClear(weatherTypes)) {
    return "yellow";
  } else {
    return "grey";
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
