import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";

const exampleCategories = ["Appetizers", "Main Plates", "Drinks", "Desserts"];

export default function Categories({
  formValues,
  setFormValues,
  attempt,
  setError,
}) {
  /**
   * Sets the categories in the form
   * @param {Object[]} categories The list of categories to set
   */
  function setCategories(categories) {
    setFormValues({ ...formValues, categories });
  }

  useEffect(() => {
    const validateFields = () => {
      if (formValues.categories.length > 0) {
        setError(false);
      } else {
        setError(true);
      }
    };
    validateFields(formValues);
  }, [formValues, setError]);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center" }} mb={4}>
        <Typography variant="h5">Item categories</Typography>
        <Tooltip title="Here you will set the categories that your menu items belong to (eg. Appetizers, Burgers, Drinks, etc.)">
          <InfoIcon fontSize="small" sx={{ color: "action.active", ml: 0.5 }} />
        </Tooltip>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={exampleCategories}
            freeSolo
            limitTags={3}
            value={formValues.categories}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  size="small"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            onChange={(e, val) => setCategories(val)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Item Categories"
                required
                error={attempt && formValues.categories.length === 0}
                helperText={
                  attempt && formValues.categories.length === 0
                    ? "Required"
                    : ""
                }
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
