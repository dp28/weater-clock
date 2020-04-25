import React from "react";
import styles from "./LightRing.module.css";

const LightRadius = `min(1vh, 1vw)`;

export const Light = ({ light, degreesPerLight }) => {
  const rotationInDegrees = light.index * degreesPerLight;
  const color = light.on ? light.color : "white";

  return (
    <div
      className={styles.lightContainer}
      style={{
        transform: `rotate(${rotationInDegrees -
          90 +
          degreesPerLight}deg) translate(calc(50% -  3 * ${LightRadius})) rotate(-${rotationInDegrees +
          270 +
          degreesPerLight}deg) translate(calc(-1 * ${LightRadius}), calc(-${light.index *
          2 +
          1} * ${LightRadius})`
      }}
    >
      <div
        style={{
          backgroundColor: light.on ? color : null,
          height: `calc(2 * ${LightRadius})`,
          width: `calc(2 * ${LightRadius})`,
          borderRadius: LightRadius,
          boxShadow: light.on
            ? `${color} 0 0 calc(1.5 * ${LightRadius}) calc(0.2 * ${LightRadius})`
            : `inset ${color} 0 0 calc(1 * ${LightRadius})`
        }}
      />
    </div>
  );
};

export const LightRing = ({ lights, inset = 0 }) => (
  <div
    className={styles.lightRing}
    style={{
      marginLeft: `calc(${inset * 2} * ${LightRadius})`,
      marginTop: `calc(${inset * 2} * ${LightRadius})`,
      width: `calc(100% - ${inset * 4} * ${LightRadius})`,
      height: `calc(100% - ${inset * 4} * ${LightRadius})`
    }}
  >
    {lights.map(light => (
      <Light
        key={light.index}
        light={light}
        degreesPerLight={360 / lights.length}
      />
    ))}
  </div>
);
