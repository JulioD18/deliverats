import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

import MapsAutocomplete from "./maps-autocomplete.js";

export default function Details({
  formValues,
  setFormValues,
  setCoordinates,
  attempt,
  setError,
}) {
  const [address, setAddress] = useState(formValues.address);

  /**
   * Handles the change of the address
   * @param {string} value The value of the address
   */
  function setAddressField(value) {
    setAddress(value.address);
    setCoordinates(value.coordinates, value.address);
  }

  /**
   * Handles the change of an input field
   * @param {string} name The name of the field
   * @param {*} value The value of the field
   */
  function handleChange(name, value) {
    const values = { ...formValues };
    values[name] = value;
    setFormValues(values);
  }

  useEffect(() => {
    const validateFields = () => {
      if (
        formValues.name !== "" &&
        formValues.lastName !== "" &&
        formValues.phone !== "" &&
        formValues.email !== "" &&
        formValues.address !== null
      ) {
        setError(undefined);
      } else {
        setError("Please fill all the required fields");
      }
    };
    validateFields(formValues);
  }, [formValues, setError]);

  return (
    <React.Fragment>
      <Typography variant="h5" mb={4}>
        Client details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formValues.name ?? ""}
            error={attempt && formValues.name === ""}
            helperText={attempt && formValues.name === "" ? "Required" : ""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="lastName"
            label="Last name"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formValues.lastName ?? ""}
            error={attempt && formValues.lastName === ""}
            helperText={attempt && formValues.lastName === "" ? "Required" : ""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MapsAutocomplete
            value={address}
            setValue={setAddressField}
            attempt={attempt}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="suite"
            label="Suite #"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formValues.suite ?? ""}
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
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={formValues.email ?? ""}
              error={attempt && formValues.email === ""}
              helperText={attempt && formValues.email === "" ? "Required" : ""}
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
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={formValues.phone ?? ""}
              error={attempt && formValues.phone === ""}
              helperText={attempt && formValues.phone === "" ? "Required" : ""}
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
