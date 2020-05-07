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

      it("returns 60 lights in the inner layer", async () => {
        expect(await (await buildLayer).inner.colours.length).toEqual(60);
      });

      it("has colours for each light based on the hour in the forecast data", async () => {
        expect(await (await buildLayer).inner.colours).toEqual(
          [
            Array(5).fill("cloudy"),
            Array(15).fill("rain"),
            Array(5).fill("snow"),
            Array(5).fill("clear"),
            Array(30).fill("cloudy"),
          ].flat()
        );
      });
    });
  });
});
