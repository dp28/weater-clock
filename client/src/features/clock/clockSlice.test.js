import { clockReducer, tick } from "./clockSlice";

describe("clock", () => {
  describe("initial state", () => {
    const startTime = new Date();
    const initialState = clockReducer(undefined, { type: "INIT" });

    describe(".time", () => {
      const time = initialState.time;

      it("has the start time's hours as its hours in 12-hour clock time", () => {
        expect(time.hours).toEqual(startTime.getHours() % 12);
      });

      it("has the start time's minutes as its minutes", () => {
        expect(time.minutes).toEqual(startTime.getMinutes());
      });

      it("has the start time's seconds as its seconds", () => {
        expect(time.seconds).toBeGreaterThanOrEqual(startTime.getSeconds());
      });
    });
  });

  describe("tick", () => {
    it("should set the clock to the current time", async () => {
      const initialState = clockReducer(undefined, { type: "INIT" });
      await delay(1000);
      const { time } = clockReducer(initialState, tick());
      expect(calculateTimeInSeconds(time)).toBeGreaterThanOrEqual(
        calculateTimeInSeconds(initialState.time) + 1
      );
      expect(calculateTimeInSeconds(time)).toBeLessThanOrEqual(
        calculateTimeInSeconds(initialState.time) + 2
      );
    });
  });
});

async function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

function calculateTimeInSeconds({ hours, minutes, seconds }) {
  return (hours * 60 + minutes) * 60 + seconds;
}
