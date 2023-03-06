import React from "react";
import Item from "./Item";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";

export default function Items({ formValues, setFormValues }) {
  /**
   * Sets the items in the form
   * @param {Object[]} items The list of items to set
   */
  function setItems(items) {
    setFormValues({ ...formValues, items });
  }

  /**
   * Add a new field to the form
   */
  function addField() {
    setItems([...formValues.items, {}]);
  }

  /**
   * Removes a field from the form
   * @param {number} i The index of the field to remove
   */
  function removeField(i) {
    const items = [...formValues.items];
    items.splice(i, 1);
    setItems(items);
  }

  /**
   * Handles the change of an input field
   * @param {number} i The index of the field to update
   * @param {string} name The name of the field to update
   * @param {any} value The value of the field to update
   */
  function handleChange(i, name, value) {
    const items = [...formValues.items];
    items[i][name] = value;
    setItems(items);
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center" }} mb={1.5}>
        <Typography variant="h6">Add your menu items</Typography>
        <Tooltip title="Here you will add the menu items (eg. Butter Chicken, Cheese Burger, Chocolate Cake, etc.)">
          <InfoIcon fontSize="small" sx={{ color: "action.active", ml: 0.5 }} />
        </Tooltip>
      </Box>
      {formValues.items.map((element, index) => (
        <div key={index}>
          <Item
            categories={formValues.categories}
            element={element}
            index={index}
            handleChange={handleChange}
            removeField={removeField}
          />
        </div>
      ))}
      <Grid container spacing={3}>
        <Grid item xs={12} container justifyContent="center">
          <Button variant="outlined" startIcon={<AddIcon />} onClick={addField}>
            Add item
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
