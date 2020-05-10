import { createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../config";

const NumberOfLights = 60;

export const innerRingSlice = createSlice({
  name: "innerRing",
  initialState: {
    lights: buildLights(NumberOfLights),
    currentIndex: 0,
    started: false,
    expiresAt: 0,
  },
  reducers: {
    setInnerRingColours: (
      state,
      { payload: { colours, expiresAt, startIndex = 0 } }
    ) => {
      state.expiresAt = expiresAt;

      colours.slice(0, NumberOfLights).forEach((colour, index) => {
        const light = state.lights[getLightIndex(index + startIndex)];
        light.colour = colour;
        light.on = true;
      });
    },
  },
});

export const { tick, setInnerRingColours } = innerRingSlice.actions;

export const innerRingReducer = innerRingSlice.reducer;

export const selectInnerRingLights = (state) => state.innerRing.lights;
export const selectExpiresAt = (state) => state.innerRing.expiresAt;

export const loadLightsIfExpired = (fetchFromAPI = fetch) => async (
  dispatch,
  getState
) => {
  if (!hasExpired(getState())) {
    return;
  }
  const response = await fetchFromAPI(apiURL);
  const data = await response.json();
  const { inner, expiresAt } = data.layer;
  dispatch(
    setInnerRingColours({
      colours: inner.colours,
      startIndex: inner.startIndex - calculateTimeZoneOffset(),
      expiresAt,
    })
  );
};

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

function hasExpired(state) {
  return selectExpiresAt(state) < new Date().getTime();
}

function calculateTimeZoneOffset() {
  return new Date().getTimezoneOffset() / 12;
}
