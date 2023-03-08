import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      state: {
        returnTo: "/",
      },
    });
  };

  return (
    <Button color="secondary" onClick={handleLogin}>
      <Typography variant="h6" sx={{ color: "black" }}>
        Log In / Sign up
      </Typography>
    </Button>
  );
};

export default LoginButton;
