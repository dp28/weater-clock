import { configureStore } from "@reduxjs/toolkit";
import { innerRingReducer } from "../features/innerRing/innerRingSlice";
import { clockReducer } from "../features/clock/clockSlice";

export default configureStore({
  reducer: {
    innerRing: innerRingReducer,
    clock: clockReducer,
  },
});
