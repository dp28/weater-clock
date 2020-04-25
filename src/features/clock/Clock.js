import React, { useState } from "react";
import { InnerRing } from "../innerRing/InnerRing";
import { LightRing } from "../lightRing/LightRing";
import styles from "./Clock.module.css";

const Snow = "white";
const Clouds = "#9E9E9E";
const Rain = "#0288D1";
const Clear = "#FDD835";

const background = {
  minutes: buildLights(60).map((light, index) => ({
    ...light,
    color: [Snow, Clouds, Rain, Clear][Math.floor((4 * index) / 60)],
    on: true
  }))
};

function buildLights(number) {
  return [...Array(number)].map((_, index) => ({
    index,
    number: index + 1,
    color: "white",
    on: false
  }));
}

export const Clock = ({ loading = false }) => {
  const [hours, setHours] = useState(buildLights(12));

  return (
    <div className={styles.clock}>
      <div className={styles.clockContent}>
        <InnerRing />
        <LightRing lights={hours} />
      </div>
    </div>
  );
};
