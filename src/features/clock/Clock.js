import React from "react";
import { LightRing } from "../lightRing/LightRing";
import styles from "./Clock.module.css";

export const Clock = () => (
  <div className={styles.clock}>
    <div className={styles.clockContent}>
      <LightRing lights={buildLights(60)} inset={2} />
      <LightRing lights={buildLights(12)} />
    </div>
  </div>
);

function buildLights(number) {
  return [...Array(number)].map((_, index) => ({
    index,
    number: index + 1,
    color: "white",
    on: index < 20
  }));
}
