import { outerRingReducer, tick, setOuterRingColours } from "./outerRingSlice";

describe("outerRing", () => {
  const initialState = outerRingReducer(undefined, { type: "INIT" });

  describe("initial state", () => {
    describe(".lights", () => {
      const lights = initialState.lights;

      it("starts with 12 lights", () => {
        expect(lights.length).toEqual(12);
      });

      it("has only off lights", () => {
        expect(lights.every((_) => !_.on)).toEqual(true);
      });

      it("has only white lights", () => {
        expect(lights.every((_) => _.color === "white")).toEqual(true);
      });
    });
  });

  describe("setOuterRingColours", () => {
    describe("if an empty array is passed in", () => {
      const state = outerRingReducer(
        initialState,
        setOuterRingColours({ colours: [] })
      );

      it("does not change the state", () => {
        expect(state).toBe(initialState);
      });
    });

    describe("if two colors are passed in", () => {
      const { lights } = outerRingReducer(
        initialState,
        setOuterRingColours({ colours: ["red", "blue"] })
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
        expect(lights.slice(2).every((_) => !_.on)).toBe(true);
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

    describe("if more than 12 colours are passed", () => {
      const { lights } = outerRingReducer(
        initialState,
        setOuterRingColours({
          colours: [...Array(14)].map((_, i) => (i < 12 ? "blue" : "red")),
        })
      );

      it("only uses the first 12", () => {
        expect(lights.every((_) => _.colour === "blue")).toBe(true);
      });
    });

    describe("if a 'startIndex' is passed", () => {
      const { lights } = outerRingReducer(
        initialState,
        setOuterRingColours({ colours: ["red", "blue"], startIndex: 4 })
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

      describe("if there are less than 12 lights, but the startIndex forces overflow", () => {
        it("wraps the colour changes around", () => {
          const state = outerRingReducer(
            initialState,
            setOuterRingColours({ colours: ["red", "blue"], startIndex: 11 })
          );
          expect(state.lights[11].colour).toEqual("red");
          expect(state.lights[0].colour).toEqual("blue");
        });
      });
    });
  });
});
