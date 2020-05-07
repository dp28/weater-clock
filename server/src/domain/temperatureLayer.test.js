const temperatureLayer = require("./temperatureLayer");

describe("temperatureLayer", () => {
  describe("#build", () => {
    describe("when the forecast is null", () => {
      it("returns an empty layer", () => {
        expect(temperatureLayer.build(null)).toEqual({
          inner: { colours: [] },
          outer: { colours: [] },
        });
      });
    });

    describe("when forecast includes temperature data", () => {
      function buildAtTemperature({ degreesCelsius, currentHour }) {
        const secondsSinceEpoch = new Date(
          2020,
          1,
          1,
          currentHour,
          45
        ).getTime();
        return temperatureLayer.build({
          current: {
            dt: secondsSinceEpoch,
            temp: degreesCelsius,
          },
        });
      }

      describe("colours", () => {
        it("returns one colour for every two degrees celsius", () => {
          const layer = buildAtTemperature({ degreesCelsius: 10 });
          expect(layer.inner.colours.length).toEqual(5);
        });

        it("returns one colour for every two degrees celsius, rounding down", () => {
          const layer = buildAtTemperature({ degreesCelsius: 5 });
          expect(layer.inner.colours.length).toEqual(2);
        });

        it("returns one colour for every two degrees celsius, even for negative temperatures", () => {
          const layer = buildAtTemperature({ degreesCelsius: -14 });
          expect(layer.inner.colours.length).toEqual(7);
        });

        it("returns red colours if the temperature is positive", () => {
          const layer = buildAtTemperature({ degreesCelsius: 5 });
          expect(layer.inner.colours.every((_) => _ === "red")).toEqual(true);
        });

        it("returns green colours if the temperature is negative", () => {
          const layer = buildAtTemperature({ degreesCelsius: -5 });
          expect(layer.inner.colours.every((_) => _ === "green")).toEqual(true);
        });
      });

      describe("startIndex", () => {
        it("is the index of the current hour, minus the number of lights", () => {
          const layer = buildAtTemperature({
            degreesCelsius: 10,
            currentHour: 8,
          });
          expect(layer.inner.startIndex).toEqual(8 * 5 + 10 / 2);
        });
      });
    });
  });
});
