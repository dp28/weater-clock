import React from "react";
import { useSelector } from "react-redux";
import { LightRing } from "../lightRing/LightRing";
import { selectInnerRingLights } from "./innerRingSlice";

export const InnerRing = ({ lightOverrides }) => {
  const lights = useSelector(selectInnerRingLights);
  return (
    <LightRing lights={combineOverrides(lights, lightOverrides)} inset={2} />
  );
};

function combineOverrides(lights, overrides) {
  return lights.map((light, index) => {
    const override = overrides[index];
    if (override) {
      return { ...light, colour: override.colour, on: true };
    } else {
      return light;
    }
  });
}
