import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { setInnerRingColours } from "./features/innerRing/innerRingSlice";
import { tick } from "./features/clock/clockSlice";
import { apiURL } from "./config";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const Colours = {
  white: "white",
  grey: "#9E9E9E",
  blue: "#0288D1",
  yellow: "#FDD835",
};

async function loadWeather() {
  const response = await fetch(apiURL);
  const data = await response.json();
  data.layers.forEach((layer) => {
    const colours = layer.inner.colours.map(
      (colourName) => Colours[colourName]
    );
    store.dispatch(
      setInnerRingColours({
        colours,
        startIndex: layer.inner.startIndex - calculateTimeZoneOffset(),
      })
    );
  });
}

function calculateTimeZoneOffset() {
  return new Date().getTimezoneOffset() / 12;
}

loadWeather();

setInterval(() => {
  store.dispatch(tick());
}, 1000);
