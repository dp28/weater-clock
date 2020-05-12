const weatherRepoBuilder = require("../../infrastructure/hardcodedWeatherRepository");

module.exports = {
  buildConfig: () => ({
    environment: "TEST",
    deployedAt: new Date(),
    version: "test",
    weatherRepository: weatherRepoBuilder(),
    allowedDomain: "localhost",
    getCurrentTime,
  }),
};

let currentTime = null;

function getCurrentTime() {
  return currentTime || new Date();
}

getCurrentTime.set = (time) => {
  currentTime = time;
};

getCurrentTime.restore = () => {
  currentTime = null;
};
