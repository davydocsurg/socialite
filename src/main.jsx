import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
// import { IndexContext } from "./contexts/IndexContext";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/fontawesome-free/css/all.css";

// style
import "./css/index.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <IndexContext> */}
    <Router>
      <App />
    </Router>
    {/* </IndexContext> */}
  </React.StrictMode>,
  document.getElementById("root")
);
