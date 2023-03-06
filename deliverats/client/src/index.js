import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import AuthNavigate from "./components/auth/auth-navigate.js";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthNavigate>
        <App />
      </AuthNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
