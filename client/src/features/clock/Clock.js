import React from "react";
import { InnerRing } from "../innerRing/InnerRing";
import { LightRing } from "../lightRing/LightRing";
import styles from "./Clock.module.css";

function buildLights(number) {
  return [...Array(number)].map((_, index) => ({
    index,
    number: index + 1,
    color: "white",
    on: false
  }));
}

export const Clock = ({ loading = false }) => {
  return (
    <div className={styles.clock}>
      <div className={styles.clockContent}>
        <InnerRing />
        <LightRing lights={buildLights(12)} />
      </div>
    </div>
  );
};
