import React from "react";
import styles from "./Clock.module.css";

const LightRadius = `min(1vh, 1vw)`;

export const Light = ({ light, degreesPerLight }) => {
  const rotationInDegrees = light.index * degreesPerLight;

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
          backgroundColor: light.on ? light.color : null,
          height: `calc(2 * ${LightRadius})`,
          width: `calc(2 * ${LightRadius})`,
          borderRadius: LightRadius,
          boxShadow: light.on
            ? `${light.color} 0 0 calc(1.5 * ${LightRadius}) calc(0.2 * ${LightRadius})`
            : `inset ${light.color} 0 0 calc(1 * ${LightRadius})`
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
