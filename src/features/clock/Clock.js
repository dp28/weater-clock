import React, { useState, useEffect } from "react";
import { useInterval } from "../../useInterval";
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
  const [minutes, setMinutes] = useState(
    loading ? buildLights(60) : background.minutes,
    [loading]
  );
  const [hours, setHours] = useState(buildLights(12));
  const [togglingOn, setTogglingOn] = useState(true);

  useInterval(
    () => {
      const lightToToggle = minutes.findIndex(light =>
        togglingOn ? !light.on : light.on
      );
      if (lightToToggle === -1) {
        setTogglingOn(!togglingOn);
      }
      setMinutes(
        minutes.map((light, index) =>
          lightToToggle === index ? { ...light, on: togglingOn } : light
        )
      );
    },
    loading ? 1000 : null
  );

  return (
    <div className={styles.clock}>
      <div className={styles.clockContent}>
        <LightRing lights={minutes} inset={2} />
        <LightRing lights={hours} />
      </div>
    </div>
  );
};
