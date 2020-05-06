import React from "react";
import { useSelector } from "react-redux";
import { InnerRing } from "../innerRing/InnerRing";
import { OuterRing } from "../outerRing/OuterRing";
import { selectClockTime } from "./clockSlice";
import styles from "./Clock.module.css";

export const Clock = ({ loading = false }) => {
  const time = useSelector(selectClockTime);
  const innerRingOverrides = {
    [time.minutes]: { colour: "purple" },
    [time.seconds]: { colour: "purple" },
  };
  const outerRingOverrides = { [time.hours]: { colour: "purple" } };
  return (
    <div className={styles.clock}>
      <div className={styles.clockContent}>
        <InnerRing lightOverrides={innerRingOverrides} />
        <OuterRing lightOverrides={outerRingOverrides} />
      </div>
    </div>
  );
};
