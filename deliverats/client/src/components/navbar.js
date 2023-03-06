import React from "react";
import LoginButton from "./auth/login-button.js";
import SignUpButton from "./auth/sign-up-button.js"
import LogOutButton from "./auth/logout-button.js";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeProvider, createTheme } from "@mui/material/styles"

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DELIVERATS
          </Typography>
          {isAuthenticated ? (<LogOutButton />) : (<Box><SignUpButton /> <LoginButton /></Box>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
