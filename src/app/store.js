import { configureStore } from "@reduxjs/toolkit";
import { innerRingReducer } from "../features/innerRing/innerRingSlice";

export default configureStore({
  reducer: {
    innerRing: innerRingReducer
  }
});
