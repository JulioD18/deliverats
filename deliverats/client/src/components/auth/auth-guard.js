import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { withAuthenticationRequired } from "@auth0/auth0-react";

// This acts as a middleware to protect routes from being accessed by unauthorized users
export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <React.Fragment>
        <CircularProgress
          size="4rem"
          sx={{
            mx: "auto",
            my: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "35vh",
          }}
        />
      </React.Fragment>
    ),
  });

  return <Component />;
};
