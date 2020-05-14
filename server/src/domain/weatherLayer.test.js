const weatherLayer = require("./weatherLayer");
const weatherRepoBuilder = require("../infrastructure/hardcodedWeatherRepository");
const weatherRepo = weatherRepoBuilder();
const { getCurrentTime } = require("../config");

describe("weatherLayer", () => {
  describe("#build", () => {
    const location = { lat: 1, lon: 2 };
    const now = new Date(2020, 1, 1, 11, 30);

    beforeEach(() => getCurrentTime.set(now));
    afterEach(() => getCurrentTime.restore());

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
        const expected = now.getTime() + 15 * 60 * 1000;
        expect(expiresAt).toEqual(expected);
      });

      describe("when it is less than 15 minutes to the end of the hour", () => {
        beforeEach(() => getCurrentTime.set(new Date(2020, 1, 1, 11, 46)));
        afterEach(() => getCurrentTime.restore());

        it("expires at the start of the next hour", async () => {
          const { expiresAt } = await weatherLayer.build(repo, location);
          const expected = new Date(2020, 1, 1, 12, 0).getTime();
          expect(expiresAt).toEqual(expected);
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

      it("has colours for each light based on the hour in the weather data and the current temperature", async () => {
        expect(await (await buildLayer).inner.colours).toEqual(
          [
            ["#9E9E9E", "#FDD835", "#9E9E9E", "#FDD835", "#9E9E9E"],
            ["#9E9E9E", "#0288D1", "#9E9E9E", "#0288D1", "#9E9E9E"],
            ["#9E9E9E", "#0288D1", "#9E9E9E", "#0288D1", "#9E9E9E"],
            Array(5).fill("#0288D1"),
            ["#9E9E9E", "#FFFFFF", "#9E9E9E", "#FFFFFF", "#9E9E9E"],
            Array(5).fill("#FDD835"),
            Array(15).fill("#9E9E9E"),
            ["#9E9E9E", "#FDD835", "#9E9E9E", "#FDD835", "#9E9E9E"],
            ["#9E9E9E", "#FDD835", "#9E9E9E", "#FDD835", "#9E9E9E"],
            Array(2).fill("#9E9E9E"),
            Array(3).fill("#FF8A65"),
          ].flat()
        );
      });
    });
  });
});
