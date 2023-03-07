import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Share() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Share the form
      </Typography>
      <Grid container spacing={3}></Grid>
    </React.Fragment>
  );
}
