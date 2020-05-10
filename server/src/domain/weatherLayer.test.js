const weatherLayer = require("./weatherLayer");
const weatherRepoBuilder = require("../infrastructure/hardcodedWeatherRepository");
const weatherRepo = weatherRepoBuilder();

describe("weatherLayer", () => {
  describe("#build", () => {
    const location = { lat: 1, lon: 2 };

    describe("when the repo returns null", () => {
      const repo = { get: async () => null };

      it("returns an empty inner layer", async () => {
        const { inner } = await weatherLayer.build(repo, location);
        expect(inner).toEqual({ colours: [], startIndex: 0 });
      });

      it("returns an empty outer layer", async () => {
        const { outer } = await weatherLayer.build(repo, location);
        expect(outer).toEqual({ colours: [], startIndex: 0 });
      });

      it("returns an expiresAt of 15 minutes now", async () => {
        const { expiresAt } = await weatherLayer.build(repo, location);
        const expected = new Date().getTime() + 15 * 60 * 1000;
        expect(expiresAt).toBeGreaterThanOrEqual(expected);
        expect(expiresAt).toBeLessThanOrEqual(expected + 1000);
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

      it("has colours for each light based on the hour in the weather data and the current temperature", async () => {
        expect(await (await buildLayer).inner.colours).toEqual(
          [
            Array(5).fill("#9E9E9E"),
            Array(15).fill("#0288D1"),
            Array(5).fill("#FFFFFF"),
            Array(5).fill("#FDD835"),
            Array(27).fill("#9E9E9E"),
            Array(3).fill("#FF8A65"),
          ].flat()
        );
      });
    });
  });
});
