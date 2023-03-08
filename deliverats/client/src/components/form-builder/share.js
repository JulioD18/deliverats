import React from "react";
import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postForms } from "../../redux/actions/form-action";
import { useAuth0 } from "@auth0/auth0-react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const Share = ({ form, postForms }) => {
  const { user, getAccessTokenSilently } = useAuth0();

  const [link, setLink] = useState(
    <Fragment>
      <CircularProgress />
    </Fragment>
  );

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await postForms({ user, token, form });
        const returnLink = `http://localhost:3000/forms/${res.id}`;
        setLink(
          <Typography variant="h6" gutterBottom>
            <Link to={returnLink}>{returnLink}</Link>
          </Typography>
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [form, postForms]);

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Share the form
      </Typography>
      <Grid container spacing={3}>
        {link}
      </Grid>
    </Fragment>
  );
};

export default connect(undefined, { postForms })(Share);
