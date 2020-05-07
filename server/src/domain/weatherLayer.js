const forecastLayerBuilder = require("./forecastLayer");
const temperatureLayerBuilder = require("./temperatureLayer");
const { convertToColour } = require("./colour");

const layerBuilders = [forecastLayerBuilder, temperatureLayerBuilder];

module.exports.build = async (weatherRepository, location) => {
  const forecast = await weatherRepository.get(location);
  const layers = layerBuilders.map((builder) => builder.build(forecast));
  return combineLayers(layers);
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
  const findInUpper = buildFindInUpper(lower, upper);
  return {
    startIndex: lower.startIndex || 0,
    colours: lower.colours
      .map((colour, index) => findInUpper(index) || colour)
      .map(convertToColour),
  };
}

function buildFindInUpper(lower, upper) {
  const conversionIndex = lower.startIndex - upper.startIndex;
  const ringSize = lower.colours.length;

  return (indexInLower) => {
    return upper.colours[(indexInLower + conversionIndex) % ringSize];
  };
}
