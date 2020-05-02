const weatherRepoBuilder = require("../../infrastructure/hardcodedWeatherRepository");

module.exports = {
  buildConfig: () => ({
    environment: "TEST",
    deployedAt: new Date(),
    version: "test",
    weatherRepository: weatherRepoBuilder(),
    allowedDomain: "localhost",
  }),
};
