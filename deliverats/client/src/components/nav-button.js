import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavButton = ({ name, url }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <Button color="secondary" onClick={handleClick}>
      <Typography>{name}</Typography>
    </Button>
  );
};

export default NavButton;
