"use strict";

const weatherRepo = require("../infrastructure/openWeatherAPIRepository");

const Boston = {
  lat: 42.3518129,
  lon: -71.081954,
};

module.exports.handle = async (event) => {
  const data = await weatherRepo.get(Boston);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        forecast: data,
      },
      null,
      2
    ),
  };
};
