import React from "react";
import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export default function Share({ formLink }) {
  const [link, setLink] = useState(
    <Fragment>
      <CircularProgress />
    </Fragment>
  );

  useEffect(() => {
    if (!formLink) return;
    setLink(
      <Grid
        container
        spacing={3}
        style={{ alignItems: "center", flexDirection: "column" }}
      >
        <Grid item>
          <QRCode value={formLink} />
        </Grid>
        <Grid item>
          <Typography variant="h6" mb={2}>
            <Link to={formLink}>{formLink}</Link>
          </Typography>
        </Grid>
      </Grid>
    );
  }, [formLink]);

  return (
    <Fragment>
      <Typography variant="h5" mb={4}>
        Share the form
      </Typography>
      {link}
    </Fragment>
  );
}
