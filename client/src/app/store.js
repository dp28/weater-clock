import { configureStore } from "@reduxjs/toolkit";
import { innerRingReducer } from "../features/innerRing/innerRingSlice";
import { outerRingReducer } from "../features/outerRing/outerRingSlice";
import { clockReducer } from "../features/clock/clockSlice";

export default configureStore({
  reducer: {
    innerRing: innerRingReducer,
    outerRing: outerRingReducer,
    clock: clockReducer,
  },
});
