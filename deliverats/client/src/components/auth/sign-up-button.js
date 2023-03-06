import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      state: {
        returnTo: "/",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button color="secondary" onClick={handleSignUp}>
      <Typography variant="h6">Sign Up</Typography>
    </Button>
  );
};

export default SignUpButton;
