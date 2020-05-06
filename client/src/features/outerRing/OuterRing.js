import React from "react";
import { useSelector } from "react-redux";
import { LightRing } from "../lightRing/LightRing";
import { selectOuterRingLights } from "./outerRingSlice";

export const OuterRing = ({ lightOverrides }) => {
  const lights = useSelector(selectOuterRingLights);
  return <LightRing lights={combineOverrides(lights, lightOverrides)} />;
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
