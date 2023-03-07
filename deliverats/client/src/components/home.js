import React from "react";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      component="img"
      src="https://i.imgur.com/jNpbDyN.png"
      sx={{
        width: "40%",
        height: "40%",
        display: "flex",
        justifyContent: "center",
        mx: "auto",
      }}
    ></Box>
  );
};

export default Home;
