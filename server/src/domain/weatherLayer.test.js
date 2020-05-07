const weatherLayer = require("./weatherLayer");
const weatherRepoBuilder = require("../infrastructure/hardcodedWeatherRepository");
const weatherRepo = weatherRepoBuilder();

describe("weatherLayer", () => {
  describe("#build", () => {
    const location = { lat: 1, lon: 2 };

    describe("when the repo returns null", () => {
      const repo = { get: async () => null };

      it("returns an empty layer", async () => {
        expect(await weatherLayer.build(repo, location)).toEqual({
          inner: { colours: [], startIndex: 0 },
          outer: { colours: [], startIndex: 0 },
        });
      });
    });

    describe("when the repo returns weather data", () => {
      const buildLayer = weatherLayer.build(weatherRepo, location);

      it("sets the startIndex based on the current hour in UTC in the weather data", async () => {
        expect((await buildLayer).inner.startIndex).toEqual(0);
      });

      it("returns 60 lights in the inner layer", async () => {
        expect(await (await buildLayer).inner.colours.length).toEqual(60);
      });

      it.only("has colours for each light based on the hour in the weather data and the current temperature", async () => {
        expect(await (await buildLayer).inner.colours).toEqual(
          [
            Array(5).fill("grey"),
            Array(15).fill("blue"),
            Array(5).fill("white"),
            Array(5).fill("yellow"),
            Array(27).fill("grey"),
            Array(3).fill("red"),
          ].flat()
        );
      });
    });
  });
});
