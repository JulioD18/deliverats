import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home.js";
import NavBar from "./components/navbar.js";
import FormBuilder from "./components/FormBuilder/FormBuilder.js";
import { greyTheme } from "./components/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import { configureStore } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";
// import reducers from "./reducers/index.js";

// const store = configureStore({ reducers });

function App() {
  return (
    // <Provider store={store}>
    <ThemeProvider theme={greyTheme}>
      <CssBaseline />
      <Grid container mb={8}>
        <NavBar />
      </Grid>
      <Grid container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form-builder" element={<FormBuilder />} />
        </Routes>
      </Grid>
    </ThemeProvider>
    // </Provider>
  );
}

export default App;
