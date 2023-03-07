import React from "react";
import LoginButton from "./auth/login-button.js";
import SignUpButton from "./auth/sign-up-button.js";
import LogOutButton from "./auth/logout-button.js";
import NavButton from "./nav-button.js";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography, Avatar } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" position="absolute">
        <Toolbar>
            <Avatar
              as = {Link}
              to = "/"
              sx={{ mr: "10px", alignItems: "bottom", borderRadius: "80%" }}
              alt="logo"
              src="https://i.imgur.com/91B3bsp.png"
            />
          <Typography as={Link} to="/" variant="h6" component="div" sx={{ flexGrow: 1, textDecoration: "none", color: "black" }}>
            DELIVERATS
          </Typography>

          {isAuthenticated ? (
            <Box>
              <NavButton url="form" name="Form" />
              <LogOutButton />
            </Box>
          ) : (
            <Box>
              <SignUpButton /> <LoginButton />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
