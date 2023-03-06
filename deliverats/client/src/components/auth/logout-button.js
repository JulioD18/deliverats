import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

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
      Log Out
    </Button>
  );
};

export default LogOutButton;
