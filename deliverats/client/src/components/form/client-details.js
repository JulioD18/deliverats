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
    values.client[e.target.name] = e.target.value;
    setFormValues(values);
  }

  useEffect(() => {
    const validateFields = () => {
      if (
        formValues.client.name !== "" &&
        formValues.client.lastName !== "" &&
        formValues.client.phone !== "" &&
        formValues.client.email !== "" &&
        formValues.client.address !== ""
      ) {
        setError(undefined);
      } else {
        setError('Please fill all the required fields');
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
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
            value={formValues.client.name ?? ""}
            error={attempt && formValues.client.name === ""}
            helperText={
              attempt && formValues.client.name === "" ? "Required" : ""
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="lastName"
            label="Last name"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
            value={formValues.client.lastName ?? ""}
            error={attempt && formValues.client.lastName === ""}
            helperText={
              attempt && formValues.client.lastName === "" ? "Required" : ""
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="address"
            label="Address"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
            value={formValues.client.address ?? ""}
            error={attempt && formValues.client.address === ""}
            helperText={
              attempt && formValues.client.address === "" ? "Required" : ""
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="address2"
            label="Address Line 2"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
            value={formValues.client.address2 ?? ""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              required
              name="email"
              label="Email"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e)}
              value={formValues.client.email ?? ""}
              error={attempt && formValues.client.email === ""}
              helperText={
                attempt && formValues.client.email === "" ? "Required" : ""
              }
            />
            <Tooltip title="This email will receive delivery notifications.">
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
              required
              name="phone"
              label="Phone"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(e)}
              value={formValues.client.phone ?? ""}
              error={attempt && formValues.client.phone === ""}
              helperText={
                attempt && formValues.client.phone === "" ? "Required" : ""
              }
            />
            <Tooltip title="This phone will receive delivery notifications via SMS.">
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
