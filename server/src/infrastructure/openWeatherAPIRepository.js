const axios = require("axios").default;

module.exports = ({ OPEN_WEATHER_MAP_API_KEY }) => {
  const defaultParams = {
    appid: OPEN_WEATHER_MAP_API_KEY,
    units: "metric",
  };
  return {
    get: async ({ lat, lon }) => {
      const response = await axios.get(
        buildOpenWeatherUrl({ ...defaultParams, lat, lon })
      );
      return response.data;
    },
  };
};

function buildOpenWeatherUrl(params) {
  return `https://api.openweathermap.org/data/2.5/onecall${buildQueryString(
    params
  )}`;
}

function buildQueryString(params) {
  return (
    "?" +
    Object.entries(params)
      .map((_) => _.join("="))
      .join("&")
  );
}
