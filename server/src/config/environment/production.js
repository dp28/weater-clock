const openWeatherAPIRepositoryBuilder = require("../../infrastructure/openWeatherAPIRepository");

function buildConfig(dependencyOverrides = {}) {
  const { readFileSync, environment } = loadDependencies(dependencyOverrides);
  const contents = readFileSync("./deploymentStats.json", {
    encoding: "utf-8",
  });
  const { version, deployedAt } = JSON.parse(contents);
  return {
    environment: "PRODUCTION",
    version,
    deployedAt: new Date(Date.parse(deployedAt)),
    weatherRepository: openWeatherAPIRepositoryBuilder(environment),
    allowedDomain: "weather-clock.djpdev.com",
  };
}

function loadDependencies({ readFileSync, environment }) {
  return {
    readFileSync: readFileSync || require("fs").readFileSync,
    environment: environment || process.env,
  };
}

module.exports = {
  buildConfig,
};
