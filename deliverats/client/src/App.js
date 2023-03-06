import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home.js";
import { greyTheme } from "./components/theme.js";
import { ThemeProvider } from "@mui/material/styles";
// import { configureStore } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";
// import reducers from "./reducers/index.js";

// const store = configureStore({ reducers });

function App() {
  return (
    // <Provider store={store}>
    <ThemeProvider theme={greyTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
    // </Provider>
  );
}

export default App;
