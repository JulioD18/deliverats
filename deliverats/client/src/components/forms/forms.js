import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getForms } from "../../redux/actions/form-action";
import { useAuth0 } from "@auth0/auth0-react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Forms = ({ getForms, forms }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { sub } = user;

  // const [forms, setForms] = useState([]);

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      await getForms({ token, sub });

      console.log(forms);
    })();
  }, []);

  const navigate = useNavigate();

  const newForm = () => {
    navigate("/form-builder");
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

const mapStateToProps = (state) => ({
  forms: state.forms,
});

export default connect(mapStateToProps, { getForms })(Forms);
