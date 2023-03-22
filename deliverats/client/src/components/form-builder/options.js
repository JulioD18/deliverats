import React, { useEffect } from "react";
import Option from "./option.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";

export default function Options({
  formValues,
  setFormValues,
  attempt,
  setError,
}) {
  /**
   * Sets the options in the form
   * @param {Object[]} options The list of options to set
   */
  function setOptions(options) {
    setFormValues({ ...formValues, options });
  }

  /**
   * Add a new field to the form
   */
  function addField() {
    setOptions([...formValues.options, {}]);
  }

  /**
   * Removes a field from the form
   * @param {number} i The index of the field to remove
   */
  function removeField(i) {
    const options = [...formValues.options];
    options.splice(i, 1);
    setOptions(options);
  }

  /**
   * Handles the change of an input field
   * @param {number} i The index of the field to update
   * @param {string} name The name of the field to update
   * @param {any} value The value of the field to update
   */
  function handleChange(i, name, value) {
    const options = [...formValues.options];
    options[i][name] = value;
    setOptions(options);
  }

  useEffect(() => {
    const validateFields = () => {
      let error = false;
      for (let option of formValues.options) {
        if (
          !option.name ||
          option.name === "" ||
          !option.items ||
          option.items.length === 0 ||
          !option.price ||
          option.price === ""
        ) {
          error = true;
        }
      }
      setError(error);
    };
    validateFields(formValues);
  }, [formValues, setError]);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center" }} mb={4}>
        <Typography variant="h5">Add options to your menu items</Typography>
        <Tooltip title="Here you will add options to your menu items (eg. Add fries (for $1), Remove ingredients (Tomato, Pickles, etc.), Add extra cheese (for $0.50), etc.)">
          <InfoIcon fontSize="small" sx={{ color: "action.active", ml: 0.5 }} />
        </Tooltip>
      </Box>
      {formValues.options.map((element, index) => (
        <Box key={index} sx={{ mb: 5 }}>
          <Option
            items={formValues.items}
            element={element}
            index={index}
            handleChange={handleChange}
            removeField={removeField}
            attempt={attempt}
          />
        </Box>
      ))}
      <Grid container spacing={3}>
        <Grid item xs={12} container justifyContent="center">
          <Button variant="outlined" startIcon={<AddIcon />} onClick={addField}>
            Add option
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
