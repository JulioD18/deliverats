import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

export default function Details({
  formValues,
  setFormValues,
  attempt,
  setError,
}) {
  /**
   * Handles the change of an input field
   * @param {*} e The event object
   */
  function handleChange(e) {
    const values = { ...formValues };
    values[e.target.name] = e.target.value;
    setFormValues(values);
  }

  useEffect(() => {
    const validateFields = () => {
      if (formValues.name !== "" && formValues.description !== "") {
        setError(false);
      } else {
        setError(true);
      }
    };
    validateFields(formValues);
  }, [formValues, setError]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Form details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            name="name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
            value={formValues.name ?? ""}
            error={attempt && formValues.name === ""}
            helperText={attempt && formValues.name === "" ? "Required" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="description"
            label="Description"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
            value={formValues.description ?? ""}
            error={attempt && formValues.description === ""}
            helperText={
              attempt && formValues.description === "" ? "Required" : ""
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e)}
              value={formValues.email ?? ""}
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
              name="phone"
              label="Phone"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e)}
              value={formValues.phone ?? ""}
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
