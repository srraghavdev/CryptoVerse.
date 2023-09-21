import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import GlobalContextProvider from "./context/GlobalContextProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
localStorage.setItem("theme", "true");
root.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);
