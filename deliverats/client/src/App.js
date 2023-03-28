import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./components/auth/auth-guard.js";
import { theme } from "./components/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import { configureStore } from "@reduxjs/toolkit";
// import reducers from "./reducers/index.js";

import Home from "./components/home.js";
import NavBar from "./components/navbar.js";
import FormBuilder from "./components/form-builder/form-builder.js";
import Deliveries from "./components/deliveries/deliveries.js";
import Forms from "./components/forms/forms.js";
import Form from "./components/form/form.js";
import FormStatus from "./components/form-status/form-status.js";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://947ce92a43184e528087e72aee89945a@o4504838835404800.ingest.sentry.io/4504838840516608",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

// const store = configureStore({ reducers });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container mb={8}>
        <NavBar />
      </Grid>
      <Grid container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deliveries/:deliveryId" element={<Form />} />
          <Route
            path="/deliveries"
            element={<AuthenticationGuard component={Deliveries} />}
          />
          <Route path="/forms/:formId" element={<Form />} />
          <Route
            path="/forms"
            element={<AuthenticationGuard component={Forms} />}
          />
          <Route
            path="/form-builder"
            element={<AuthenticationGuard component={FormBuilder} />}
          />
          <Route path="track/:deliveryId" element={<FormStatus />} />
        </Routes>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
