import React from "react";
import LoginButton from "./auth/login-button.js";
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
      <AppBar color="primary" position="fixed">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              as={Link}
              to="/"
              sx={{ mr: "10px", alignItems: "bottom", borderRadius: "80%" }}
              alt="logo"
              src="https://i.imgur.com/FImmAog.png"
            />
            <Typography
              as={Link}
              to="/"
              component="div"
              sx={{ textDecoration: "none" }}
              color="secondary"
            >
              DELIVERATS
            </Typography>
          </Box>

          {isAuthenticated && (
            <Box>
              <NavButton url="deliveries" name="Deliveries" />
              <NavButton url="forms" name="Forms" />
            </Box>
          )}

          {isAuthenticated ? <LogOutButton /> : <LoginButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
