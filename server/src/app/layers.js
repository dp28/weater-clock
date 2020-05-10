"use strict";

const config = require("../config");
const weatherLayer = require("../domain/weatherLayer");

const Boston = {
  lat: 42.3518129,
  lon: -71.081954,
};

console.log(`On version '${config.version}' deployed at ${config.deployedAt}`);

module.exports.handle = async (_event) => {
  const layer = await weatherLayer.build(config.weatherRepository, Boston);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": config.allowedDomain,
    },
    body: JSON.stringify({
      layer,
    }),
  };
};
