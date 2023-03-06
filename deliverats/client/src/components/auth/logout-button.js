import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";

const LogOutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: "/",
      },
    });
  };

  return (
    <Button
      color="error"
      onClick={handleLogout}
    >
      <Typography variant="h6">
        Log Out
      </Typography>
    </Button>
  );
};

export default LogOutButton;
