import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { tick, setLightColours } from "./features/innerRing/innerRingSlice";

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

const Snow = "white";
const Clouds = "#9E9E9E";
const Rain = "#0288D1";
const Clear = "#FDD835";

store.dispatch(
  setLightColours({
    colours: [Snow, Clouds, Rain, Clear].flatMap(_ => Array(15).fill(_))
  })
);

setInterval(() => {
  store.dispatch(tick());
}, 1000);
