import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

export default function Details() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Form details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="formName"
            name="formName"
            label="Name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="formDescription"
            name="formDescription"
            label="Description"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              id="formEmail"
              name="formEmail"
              label="Email"
              fullWidth
              variant="standard"
            />
            <Tooltip title="This email will receive notifications when clients complete the form.">
              <InfoIcon
                fontSize="small"
                sx={{ color: "action.active", ml: 0.5, my: 0.5 }}
              />
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              id="formPhone"
              name="formPhone"
              label="Phone"
              fullWidth
              variant="standard"
            />
            <Tooltip title="This phone will receive SMS notifications when clients complete the form.">
              <InfoIcon
                fontSize="small"
                sx={{ color: "action.active", ml: 0.5, my: 0.5 }}
              />
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
