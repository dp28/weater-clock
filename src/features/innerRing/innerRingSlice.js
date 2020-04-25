import { createSlice } from "@reduxjs/toolkit";

export const innerRingSlice = createSlice({
  name: "innerRing",
  initialState: { lights: buildLights(60) },
  reducers: {
    tick: state => {
      const currentIndex = state.lights.findIndex(_ => _.on);
      if (currentIndex === -1 || currentIndex === 59) {
        state.lights[59].on = false;
        state.lights[0].on = true;
      } else {
        state.lights[currentIndex].on = false;
        state.lights[currentIndex + 1].on = true;
      }
    }
  }
});

export const { tick } = innerRingSlice.actions;

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
