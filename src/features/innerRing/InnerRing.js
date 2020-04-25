import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LightRing } from "../lightRing/LightRing";
import { selectInnerRingLights } from "./innerRingSlice";

export const InnerRing = () => {
  const lights = useSelector(selectInnerRingLights);
  return <LightRing lights={lights} inset={2} />;
};
