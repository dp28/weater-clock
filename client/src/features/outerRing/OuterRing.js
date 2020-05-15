import React from "react";
import { useSelector } from "react-redux";
import { LightRing } from "../lightRing/LightRing";
import { selectOuterRingLights } from "./outerRingSlice";
import styles from "../lightRing/LightRing.module.css";

const DegreesPerNumber = 360 / 12;
const Width = `min(1vh, 1vw)`;

export const Number = ({ number, index }) => {
  const rotationInDegrees = (index - 1) * DegreesPerNumber;

  return (
    <div
      className={styles.lightContainer}
      style={{
        transform: `rotate(${
          rotationInDegrees - 90 + DegreesPerNumber
        }deg) translate(calc(50% -  3 * ${Width})) rotate(-${
          rotationInDegrees + 270 + DegreesPerNumber
        }deg) translate(calc(-1 * ${Width}), calc(-${
          index * 2 + 1
        } * ${Width})`,
      }}
    >
      <div
        style={{
          color: "white",
          height: `calc(2 * ${Width})`,
          width: `calc(2 * ${Width})`,
          fontSize: `calc(2 * ${Width})`,
          fontWeight: "bold",
        }}
      >
        {number}
      </div>
    </div>
  );
};

export const OuterRing = ({}) => (
  <div
    className={styles.lightRing}
    style={{
      marginLeft: `calc(${Width})`,
      marginTop: `calc(${Width})`,
      width: `calc(100% - ${Width})`,
      height: `calc(100% - ${Width})`,
    }}
  >
    {Array(12)
      .fill(null)
      .map((_, index) => (
        <Number key={index} index={index} number={index || 12} />
      ))}
  </div>
);
