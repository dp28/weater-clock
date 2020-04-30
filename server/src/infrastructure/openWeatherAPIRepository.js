const axios = require("axios").default;

module.exports.get = async ({ lat, lon }) => {
  const response = await axios.get(buildOpenWeatherUrl({ lat, lon }));
  return response.data;
};

function buildOpenWeatherUrl({ lat, lon }) {
  return `https://api.openweathermap.org/data/2.5/onecall${buildQueryString({
    lat,
    lon,
  })}`;
}

function buildQueryString({ lat, lon }) {
  const params = {
    appid: process.env.OPEN_WEATHER_MAP_API_KEY,
    lat,
    lon,
    units: "metric",
  };
  return (
    "?" +
    Object.entries(params)
      .map((_) => _.join("="))
      .join("&")
  );
}
