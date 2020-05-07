const forecastLayer = require("./forecastLayer");

module.exports.build = async (weatherRepository, location) => {
  const weather = await weatherRepository.get(location);

  return forecastLayer.build(weather);
};
