"use strict";

const axios = require("axios").default;

const Boston = {
  lat: 42.3518129,
  lon: -71.081954,
};

module.exports.forecast = async (event) => {
  const response = await axios.get(buildOpenWeatherUrl());

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        forecast: response.data,
      },
      null,
      2
    ),
  };
};

function buildOpenWeatherUrl() {
  return `https://api.openweathermap.org/data/2.5/onecall${buildQueryString()}`;
}

function buildQueryString() {
  const params = {
    appid: process.env.OPEN_WEATHER_MAP_API_KEY,
    lat: Boston.lat,
    lon: Boston.lon,
    units: "metric",
  };
  return (
    "?" +
    Object.entries(params)
      .map((_) => _.join("="))
      .join("&")
  );
}
