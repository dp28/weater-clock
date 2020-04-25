import { innerRingReducer, tick } from "./innerRingSlice";

describe("innerRing", () => {
  const initialState = innerRingReducer(undefined, { type: "INIT" });

  describe("initial state", () => {
    describe(".lights", () => {
      const lights = initialState.lights;

      it("starts with 60 lights", () => {
        expect(lights.length).toEqual(60);
      });

      it("has only off lights", () => {
        expect(lights.every(_ => !_.on)).toEqual(true);
      });

      it("has only white lights", () => {
        expect(lights.every(_ => _.color === "white")).toEqual(true);
      });
    });
  });

  describe("tick", () => {
    describe("when all lights are off", () => {
      const { lights } = innerRingReducer(initialState, tick());

      it("turns on the first light", () => {
        expect(lights[0].on).toEqual(true);
      });

      it("leaves all the other lights off", () => {
        expect(lights.slice(1).every(_ => !_.on)).toEqual(true);
      });
    });

    describe("when the first light is on", () => {
      const { lights } = [tick(), tick()].reduce(
        innerRingReducer,
        initialState
      );

      it("turns off the first light", () => {
        expect(lights[0].on).toEqual(false);
      });

      it("turns on the second light", () => {
        expect(lights[1].on).toEqual(true);
      });

      it("leaves all the other lights off", () => {
        expect(
          lights.every((light, index) => index === 1 || !light.on)
        ).toEqual(true);
      });
    });

    describe("when the second light is on", () => {
      const { lights } = [tick(), tick(), tick()].reduce(
        innerRingReducer,
        initialState
      );

      it("turns off the second light", () => {
        expect(lights[1].on).toEqual(false);
      });

      it("turns on the third light", () => {
        expect(lights[2].on).toEqual(true);
      });

      it("leaves all the other lights off", () => {
        expect(
          lights.every((light, index) => index === 2 || !light.on)
        ).toEqual(true);
      });
    });

    describe("when the last light is on", () => {
      const { lights } = [...Array(61)]
        .map(tick)
        .reduce(innerRingReducer, initialState);

      it("turns off the last light", () => {
        expect(lights[59].on).toEqual(false);
      });

      it("turns on the first light", () => {
        expect(lights[0].on).toEqual(true);
      });

      it("leaves all the other lights off", () => {
        expect(
          lights.every((light, index) => index === 0 || !light.on)
        ).toEqual(true);
      });
    });
  });
});
