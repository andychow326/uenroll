import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
