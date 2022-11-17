import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Render from "./frontend/Render";

// settings - backend
const wcforce_settings = ReactDOM.createRoot(
  document.getElementById("wcforce-root")
);
wcforce_settings.render(<App />);

// rendering - frontend
const wcforce_rendering = ReactDOM.createRoot(
  document.getElementById("wcforce-rendering")
);
wcforce_rendering.render(<Render />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
