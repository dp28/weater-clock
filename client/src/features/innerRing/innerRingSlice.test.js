import { innerRingReducer, tick, setLightColours } from "./innerRingSlice";

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

    describe("when all lights are on", () => {
      const { lights } = [
        setLightColours({ colours: Array(60).fill("blue") }),
        tick()
      ].reduce(innerRingReducer, initialState);

      it("turns off the first light", () => {
        expect(lights[0].on).toEqual(false);
      });

      it("leaves all the other lights on", () => {
        expect(lights.slice(1).every(_ => _.on)).toEqual(true);
      });
    });
  });

  describe("setLightColours", () => {
    describe("if an empty array is passed in", () => {
      const state = innerRingReducer(
        initialState,
        setLightColours({ colours: [] })
      );

      it("does not change the state", () => {
        expect(state).toBe(initialState);
      });
    });

    describe("if two colors are passed in", () => {
      const { lights } = innerRingReducer(
        initialState,
        setLightColours({ colours: ["red", "blue"] })
      );

      it("turns on the first two lights", () => {
        expect(lights[0].on).toBe(true);
        expect(lights[1].on).toBe(true);
      });

      it("changes the colour of the first two lights to the passed-in colours at the same index", () => {
        expect(lights[0].colour).toEqual("red");
        expect(lights[1].colour).toEqual("blue");
      });

      it("keeps the other lights off", () => {
        expect(lights.slice(2).every(_ => !_.on)).toBe(true);
      });

      it("keeps the other lights the colours they previously were", () => {
        expect(
          lights
            .slice(2)
            .every(
              (light, index) =>
                light.colour === initialState.lights[index].colour
            )
        ).toBe(true);
      });
    });

    describe("if more than 60 colours are passed", () => {
      const { lights } = innerRingReducer(
        initialState,
        setLightColours({
          colours: [...Array(62)].map((_, i) => (i < 60 ? "blue" : "red"))
        })
      );

      it("only uses the first 60", () => {
        expect(lights.every(_ => _.colour === "blue")).toBe(true);
      });
    });

    describe("if a 'startIndex' is passed", () => {
      const { lights } = innerRingReducer(
        initialState,
        setLightColours({ colours: ["red", "blue"], startIndex: 4 })
      );

      it("changes the colours, starting at the index specified", () => {
        expect(lights[4].colour).toEqual("red");
        expect(lights[5].colour).toEqual("blue");
      });

      it("keeps the other lights the colours they previously were", () => {
        expect(
          lights
            .slice(0, 4)
            .concat(lights.slice(6))
            .every(
              (light, index) =>
                light.colour === initialState.lights[index].colour
            )
        ).toBe(true);
      });

      describe("if there are less than 60 lights, but the startIndex forces overflow", () => {
        it("wraps the colour changes around", () => {
          const state = innerRingReducer(
            initialState,
            setLightColours({ colours: ["red", "blue"], startIndex: 59 })
          );
          expect(state.lights[59].colour).toEqual("red");
          expect(state.lights[0].colour).toEqual("blue");
        });
      });
    });
  });
});
