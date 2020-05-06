import React from "react";
import { useSelector } from "react-redux";
import { InnerRing } from "../innerRing/InnerRing";
import { LightRing } from "../lightRing/LightRing";
import { selectClockTime } from "./clockSlice";
import styles from "./Clock.module.css";

function buildLights(number) {
  return [...Array(number)].map((_, index) => ({
    index,
    number: index + 1,
    color: "white",
    on: false,
  }));
}

export const Clock = ({ loading = false }) => {
  const time = useSelector(selectClockTime);
  const innerRingOverrides = {
    [time.minutes]: { colour: "purple" },
    [time.seconds]: { colour: "purple" },
  };
  return (
    <div className={styles.clock}>
      <div className={styles.clockContent}>
        <InnerRing lightOverrides={innerRingOverrides} />
        <LightRing lights={buildLights(12)} />
      </div>
    </div>
  );
};
