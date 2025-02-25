import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AutoProvider } from "./context/AutoContext";
import "./styles/GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AutoProvider>
      <App />
    </AutoProvider>
  </React.StrictMode>
);

