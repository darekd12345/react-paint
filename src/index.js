import React from "react";
import ReactDOM from "react-dom";

import ReactPaint from "./components/react-paint";
import styles from "./styles/styles.scss";

const App = () => {
  return <ReactPaint />;
};

ReactDOM.render(<App />, document.getElementById("app"));
