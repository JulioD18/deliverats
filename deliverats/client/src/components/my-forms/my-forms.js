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
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

const formLimit = 8;

const MyForms = ({ getForms }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { sub } = user;
  const [offset, setOffset] = useState(0);

  const [formList, setFormList] = useState(
    <Grid
      item
      container
      mt={2}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <CircularProgress />
    </Grid>
  );

  const paginationChange = (event, value) => {
    setOffset((value - 1) * formLimit);
  };

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const res = await getForms({ token, sub, offset, limit: formLimit });
      const pages = Math.ceil(res.payload.count / formLimit);

      setFormList(
        <Grid item container spacing={3} mt={2}>
          {res.payload.forms.map((form) => (
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
                    height: "100%",
                  },
                }}
              >
                <Typography component="h1" variant="h6" align="center" mb={2}>
                  {form.name}
                </Typography>
                <Button variant="contained" href={`/forms/${form.id}`}>
                  View Form
                </Button>
              </Paper>
            </Grid>
          ))}
          <Grid item container sx={{ justifyContent: "center" }}>
            <Pagination
              count={pages}
              sx={{ marginTop: "20px" }}
              size="large"
              showFirstButton
              showLastButton
              onChange={paginationChange}
            />
          </Grid>
        </Grid>
      );
    })();
  }, [getAccessTokenSilently, getForms, offset, sub]);

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
          {formList}
        </Grid>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  forms: state.form.forms,
});

export default connect(mapStateToProps, { getForms })(MyForms);
