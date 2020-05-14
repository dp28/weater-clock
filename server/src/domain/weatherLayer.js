const forecastLayerBuilder = require("./forecastLayer");
const temperatureLayerBuilder = require("./temperatureLayer");
const { convertHourToColours, convertToColour } = require("./colour");
const { getCurrentTime } = require("../config");

const FIFTEEN_MINUTES_IN_MILLIS = 15 * 60 * 1000;
const HOUR_IN_MILLIS = 4 * FIFTEEN_MINUTES_IN_MILLIS;

const layerBuilders = [forecastLayerBuilder, temperatureLayerBuilder];

module.exports.build = async (weatherRepository, location) => {
  const forecast = await weatherRepository.get(location);
  const layers = layerBuilders.map((builder) => builder.build(forecast));
  return {
    ...combineLayers(layers),
    expiresAt: calculateExpiryTime(),
  };
};

function combineLayers(layers) {
  return layers.reduce(combineTwoLayers);
}

function combineTwoLayers(lower, upper) {
  return {
    outer: { colours: [], startIndex: 0 },
    inner: combineInnerRings(lower.inner, upper.inner),
  };
}

function combineInnerRings(lower, upper) {
  const lowerColours = {
    ...lower,
    colours: lower.colours.flatMap(convertHourToColours),
  };

  const findInUpper = buildFindInUpper(lowerColours, upper);
  return {
    startIndex: lowerColours.startIndex || 0,
    colours: lowerColours.colours.map((colour, index) => {
      const upperType = findInUpper(index);
      return upperType ? convertToColour(upperType) : colour;
    }),
  };
}

function buildFindInUpper(lower, upper) {
  const conversionIndex = lower.startIndex - upper.startIndex;
  const ringSize = lower.colours.length;

  return (indexInLower) => {
    return upper.colours[(indexInLower + conversionIndex) % ringSize];
  };
}

function calculateExpiryTime() {
  const now = getCurrentTime();
  if (isLessThanFifteenMinutesUntilNextHour(now)) {
    return nextHour(now);
  } else {
    return fifteenMinutesFrom(now);
  }
}

function isLessThanFifteenMinutesUntilNextHour(date) {
  return date.getTime() % HOUR_IN_MILLIS > 3 * FIFTEEN_MINUTES_IN_MILLIS;
}

function nextHour(date) {
  return Math.ceil(date.getTime() / HOUR_IN_MILLIS) * HOUR_IN_MILLIS;
}

function fifteenMinutesFrom(date) {
  return date.getTime() + FIFTEEN_MINUTES_IN_MILLIS;
}
