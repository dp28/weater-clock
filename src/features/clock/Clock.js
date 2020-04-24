import React, { useState, useEffect, useRef } from "react";
import { LightRing } from "../lightRing/LightRing";
import styles from "./Clock.module.css";

export const Clock = ({ loading = true }) => {
  const [minutes, setMinutes] = useState(buildLights(60));
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

function buildLights(number) {
  return [...Array(number)].map((_, index) => ({
    index,
    number: index + 1,
    color: "white",
    on: false
  }));
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
