import React from "react";
import NavBar from "./navbar.js";
import {Box, Avatar} from "@mui/material";

const Home = () => {
  return (
    <Box>
      <NavBar />
      <Avatar sx={{height: "100%", width: "100%"}} src="../../public/logo-no-background.png" alt="logo" />
      </Box>
  )
}

export default Home;