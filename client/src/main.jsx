import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import All from "./components/context/AllContexts.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <All>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </All>
  </React.StrictMode>
);
