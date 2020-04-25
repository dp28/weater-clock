import { createSlice } from "@reduxjs/toolkit";

const NumberOfLights = 60;

export const innerRingSlice = createSlice({
  name: "innerRing",
  initialState: {
    lights: buildLights(NumberOfLights),
    currentIndex: 0,
    started: false
  },
  reducers: {
    tick: state => {
      const currentLight = state.lights[state.currentIndex];
      const previousLight = state.lights[getLightIndex(state.currentIndex - 1)];

      state.currentIndex = getLightIndex(state.currentIndex + 1);
      currentLight.on = !currentLight.on;

      if (state.started) {
        previousLight.on = !previousLight.on;
      } else {
        state.started = true;
      }
    },
    setLightColours: (state, { payload: { colours, startIndex = 0 } }) => {
      colours.slice(0, NumberOfLights).forEach((colour, index) => {
        const light = state.lights[getLightIndex(index + startIndex)];
        light.colour = colour;
        light.on = true;
      });
    }
  }
});

export const { tick, setLightColours } = innerRingSlice.actions;

export const innerRingReducer = innerRingSlice.reducer;

export const selectInnerRingLights = state => state.innerRing.lights;

function buildLights(number) {
  return [...Array(number)].map((_, index) => ({
    index,
    number: index + 1,
    color: "white",
    on: false
  }));
}

function getLightIndex(number) {
  const index = number % NumberOfLights;
  return index >= 0 ? index : NumberOfLights + index;
}
