import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getForms } from "../../redux/actions/form-action";
import { useAuth0 } from "@auth0/auth0-react";

import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const formLimit = 8;

const Forms = ({ forms, getForms }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { sub } = user;
  const [offset, setOffset] = useState(0);

  const theme = useTheme();
  const navigate = useNavigate();

  const paginationChange = (event, value) => {
    setOffset((value - 1) * formLimit);
  };

  const newForm = () => {
    navigate("/form-builder");
  };

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      await getForms({ token, sub, offset, limit: formLimit });
    })();
  }, [!forms, offset]);

  return (
    <Container component="main">
      {!forms?.forms && (
        <Grid
          container
          mt={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CircularProgress size="4rem" sx={{ marginTop: "35vh" }} />
        </Grid>
      )}
      {forms?.forms && (
        <Grid container spacing={3} mt={2}>
          {forms.forms.length > 0 &&
            forms.forms.map((form) => (
              <Grid item key={form.id} style={{ width: "25%" }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: {
                      xs: 2,
                      md: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "100%",
                    },
                  }}
                >
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    <LocalPizzaIcon />
                  </Avatar>
                  <Typography component="h6" align="center" my={1.5}>
                    {form.name}
                  </Typography>
                  <Button
                    component={Link}
                    variant="contained"
                    to={`/forms/${form.id}`}
                    sx={{ textDecoration: "none" }}
                  >
                    View Form
                  </Button>
                </Paper>
              </Grid>
            ))}
          {forms.count > formLimit && (
            <Grid item container sx={{ justifyContent: "center" }}>
              <Pagination
                count={Math.ceil(forms.count / formLimit)}
                sx={{ marginTop: "20px" }}
                size="large"
                showFirstButton
                showLastButton
                onChange={paginationChange}
              />
            </Grid>
          )}
          {forms.forms.length === 0 && (
            <Grid item container sx={{ justifyContent: "center" }}>
              <Grid item container sx={{ justifyContent: "center" }}>
                <SearchOffIcon sx={{ fontSize: 100 }} />
              </Grid>
              <Grid item container sx={{ justifyContent: "center" }} mt={2}>
                <Typography variant="h6" component="h6">
                  No forms found
                </Typography>
              </Grid>
              <Grid item container sx={{ justifyContent: "center" }} mt={4}>
                <Button onClick={newForm} variant="contained">
                  Create Form
                </Button>
              </Grid>
            </Grid>
          )}
          {forms.forms.length > 0 && (
            <Fab
              size="large"
              onClick={newForm}
              color="primary"
              sx={{ position: "fixed", bottom: "40px", right: "40px" }}
            >
              <AddIcon />
            </Fab>
          )}
        </Grid>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  forms: state.form.forms,
});

export default connect(mapStateToProps, { getForms })(Forms);
