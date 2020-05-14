const forecastLayer = require("./forecastLayer");
const weatherRepoBuilder = require("../infrastructure/hardcodedWeatherRepository");
const forecastPromise = weatherRepoBuilder().get({});

describe("forecastLayer", () => {
  describe("#build", () => {
    describe("when the forecast is null", () => {
      it("returns an empty layer", () => {
        expect(forecastLayer.build(null)).toEqual({
          inner: { colours: [] },
          outer: { colours: [] },
        });
      });
    });

    describe("when forecast includes weather data", () => {
      const buildLayer = forecastPromise.then((_) => forecastLayer.build(_));

      it("sets the startIndex based on the current hour in UTC in the weather data", async () => {
        expect((await buildLayer).inner.startIndex).toEqual(0);
      });

      it("returns 12 lights in the inner layer", async () => {
        expect(await (await buildLayer).inner.colours.length).toEqual(12);
      });

      it("has colours for each light based on the hour in the forecast data", async () => {
        expect(await (await buildLayer).inner.colours).toEqual(
          [
            "light_clouds",
            "light_rain",
            "light_rain",
            "rain",
            "light_snow",
            "clear",
            Array(3).fill("cloudy"),
            "light_clouds",
            "light_clouds",
            "cloudy",
          ].flat()
        );
      });
    });
  });
});
