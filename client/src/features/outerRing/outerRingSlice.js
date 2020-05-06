import { createSlice } from "@reduxjs/toolkit";

const NumberOfLights = 12;

export const outerRingSlice = createSlice({
  name: "outerRing",
  initialState: {
    lights: buildLights(NumberOfLights),
    currentIndex: 0,
    started: false,
  },
  reducers: {
    setOuterRingColours: (state, { payload: { colours, startIndex = 0 } }) => {
      colours.slice(0, NumberOfLights).forEach((colour, index) => {
        const light = state.lights[getLightIndex(index + startIndex)];
        light.colour = colour;
        light.on = true;
      });
    },
  },
});

export const { tick, setOuterRingColours } = outerRingSlice.actions;

export const outerRingReducer = outerRingSlice.reducer;

export const selectOuterRingLights = (state) => state.outerRing.lights;

function buildLights(number) {
  return [...Array(number)].map((_, index) => ({
    index,
    number: index + 1,
    color: "white",
    on: false,
  }));
}

function getLightIndex(number) {
  const index = number % NumberOfLights;
  return index >= 0 ? index : NumberOfLights + index;
}
