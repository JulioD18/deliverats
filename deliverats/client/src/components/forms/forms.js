import React, { useState } from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const Forms = () => {
  const [forms, setForms] = useState([]);

  const navigate = useNavigate();

  const newForm = () => {
    navigate('/form-builder');
  };

  return (
    <Container component="main" sx={{ mt: 4, mb: 2 }}>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          My Forms
        </Typography>
        <Grid container>
          <Grid item>
            <Button variant="contained" onClick={newForm}>
              Create Form
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Forms;
