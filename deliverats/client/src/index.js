import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import AuthNavigate from "./components/auth/auth-navigate.js";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthNavigate>
        <App />
      </AuthNavigate>
    </BrowserRouter>
  </Provider>
);
