import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

import { withAuthenticationRequired } from "@auth0/auth0-react";

// This acts as a middleware to protect routes from being accessed by unauthorized users
export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <React.Fragment>
        <Box marginTop="40%"></Box>
        <CircularProgress
          size="4rem"
          sx={{
            mx: "auto", 
            my: "auto", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
          }}
        />
      </React.Fragment>
    ),
  });

  return <Component />;
};
