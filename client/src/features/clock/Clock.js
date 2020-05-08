import React from "react";
import { useSelector } from "react-redux";
import { InnerRing } from "../innerRing/InnerRing";
import { OuterRing } from "../outerRing/OuterRing";
import { selectClockTime } from "./clockSlice";
import styles from "./Clock.module.css";

export const Clock = ({ loading = false }) => {
  const time = useSelector(selectClockTime);
  const outerRingOverrides = { [time.hours]: { colour: "#2E7D32" } };
  const innerRingOverrides = {
    [time.minutes]: { colour: "#4CAF50" },
    [time.seconds]: { colour: "#A5D6A7" },
  };
  return (
    <div className={styles.clock}>
      <div className={styles.clockContent}>
        <InnerRing lightOverrides={innerRingOverrides} />
        <OuterRing lightOverrides={outerRingOverrides} />
      </div>
    </div>
  );
};
