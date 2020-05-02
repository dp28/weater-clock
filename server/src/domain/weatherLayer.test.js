const weatherLayer = require("./weatherLayer");
const weatherRepo = require("../infrastructure/hardcodedWeatherRepository");

describe("weatherLayer", () => {
  describe("#build", () => {
    const location = { lat: 1, lon: 2 };

    describe("when the repo returns null", () => {
      const repo = { get: async () => null };

      it("returns an empty layer", async () => {
        expect(await weatherLayer.build(repo, location)).toEqual({
          inner: { colours: [] },
          outer: { colours: [] },
        });
      });
    });

    describe("when the repo returns weather data", () => {
      const buildLayer = weatherLayer.build(weatherRepo, location);

      it("sets the startIndex based on the current time in UTC in the weather data, to the earliest 12 minutes", async () => {
        expect((await buildLayer).inner.startIndex).toEqual(3);
      });

      it("returns 60 lights in the inner layer", async () => {
        expect(await (await buildLayer).inner.colours.length).toEqual(60);
      });

      it("has colours for each light based on the hour in the weather data", async () => {
        expect(await (await buildLayer).inner.colours).toEqual(
          [
            Array(2).fill("grey"),
            Array(15).fill("blue"),
            Array(5).fill("white"),
            Array(5).fill("yellow"),
            Array(33).fill("grey"),
          ].flat()
        );
      });
    });
  });
});
