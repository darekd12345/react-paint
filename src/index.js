import React from "react";
import ReactDOM from "react-dom";

import ReactPaint from "./components/react-paint";
import reactpaint from "./styles/reactpaint.css";

const App = () => {
  return (
    <ReactPaint />
  );
};

ReactDOM.render(<App />, document.getElementById("app"));