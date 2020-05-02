"use strict";

const weatherRepo = require("../infrastructure/openWeatherAPIRepository");
const weatherLayer = require("../domain/weatherLayer");

const Boston = {
  lat: 42.3518129,
  lon: -71.081954,
};

module.exports.handle = async (event) => {
  const layer = await weatherLayer.build(weatherRepo, Boston);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        layers: [layer],
      },
      null,
      2
    ),
  };
};
