import {
  innerRingReducer,
  loadLightsIfExpired,
  setInnerRingColours,
} from "./innerRingSlice";
import { apiURL } from "../../config";

describe("innerRing", () => {
  const initialState = innerRingReducer(undefined, { type: "INIT" });

  describe("initial state", () => {
    it("has an expiresAt time of 0", () => {
      expect(initialState.expiresAt).toEqual(0);
    });

    describe(".lights", () => {
      const lights = initialState.lights;

      it("starts with 60 lights", () => {
        expect(lights.length).toEqual(60);
      });

      it("has only off lights", () => {
        expect(lights.every((_) => !_.on)).toEqual(true);
      });

      it("has only white lights", () => {
        expect(lights.every((_) => _.color === "white")).toEqual(true);
      });
    });
  });

  describe("setInnerRingColours", () => {
    it("sets expiresAt to the passed-in expiresAt", () => {
      const state = innerRingReducer(
        initialState,
        setInnerRingColours({ colours: [], expiresAt: 5 })
      );
      expect(state.expiresAt).toEqual(5);
    });

    describe("if an empty array is passed in", () => {
      const state = innerRingReducer(
        initialState,
        setInnerRingColours({ colours: [], expiresAt: 0 })
      );

      it("does not change the state", () => {
        expect(state).toBe(initialState);
      });
    });

    describe("if two colors are passed in", () => {
      const { lights } = innerRingReducer(
        initialState,
        setInnerRingColours({ colours: ["red", "blue"] })
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

    describe("if more than 60 colours are passed", () => {
      const { lights } = innerRingReducer(
        initialState,
        setInnerRingColours({
          colours: [...Array(62)].map((_, i) => (i < 60 ? "blue" : "red")),
        })
      );

      it("only uses the first 60", () => {
        expect(lights.every((_) => _.colour === "blue")).toBe(true);
      });
    });

    describe("if a 'startIndex' is passed", () => {
      const { lights } = innerRingReducer(
        initialState,
        setInnerRingColours({ colours: ["red", "blue"], startIndex: 4 })
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
            setInnerRingColours({ colours: ["red", "blue"], startIndex: 59 })
          );
          expect(state.lights[59].colour).toEqual("red");
          expect(state.lights[0].colour).toEqual("blue");
        });
      });
    });
  });

  describe("loadLightsIfExpired", () => {
    function buildMockFetch(response) {
      return jest.fn(async () => ({ json: async () => response }));
    }

    describe("in the initial state", () => {
      it("calls the API", async () => {
        const mockFetch = buildMockFetch({ layers: [] });
        const mockDispatch = jest.fn();
        await loadLightsIfExpired(mockFetch)(mockDispatch, () => ({
          innerRing: {
            expiresAt: 0,
          },
        }));
        expect(mockFetch).toHaveBeenCalledWith(apiURL);
      });

      describe("after the API request succeeds", () => {
        it("sets the colours, time zone adjusted", async () => {
          const layer = {
            inner: {
              colours: ["red"],
              startIndex: 10,
            },
            expiresAt: 5,
          };
          const mockFetch = buildMockFetch({ layer });
          const mockDispatch = jest.fn();
          await loadLightsIfExpired(mockFetch)(mockDispatch, () => ({
            innerRing: {
              expiresAt: 0,
            },
          }));
          expect(mockDispatch).toHaveBeenCalledWith(
            setInnerRingColours({
              colours: layer.inner.colours,
              startIndex: 10 - new Date().getTimezoneOffset() / 12,
              expiresAt: 5,
            })
          );
        });
      });
    });

    describe("when the data has not expired", () => {
      it("does not call the API", async () => {
        const mockFetch = buildMockFetch({ layers: [] });
        const mockDispatch = jest.fn();
        await loadLightsIfExpired(mockFetch)(mockDispatch, () => ({
          innerRing: { expiresAt: new Date().getTime() + 5000 },
        }));
        expect(mockFetch).not.toHaveBeenCalled();
      });
    });
  });
});
