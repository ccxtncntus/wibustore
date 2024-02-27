import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import All from "./components/context/AllContexts.jsx";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <All>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </All>
    </Provider>
    ,
  </React.StrictMode>
);
