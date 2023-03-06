import React from "react";
import Item from "./Item";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function Items({
  formValues,
  setFormValues,
}) {
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
   * @param {*} e The event object
   */
  function handleChange(i, e) {
    const items = [...formValues.items];
    items[i][e.target.name] = e.target.value;
    setItems(items);
    console.log(formValues);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add your menu items
      </Typography>
      {formValues.items.map((element, index) => (
        <div key={index}>
          <Item
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
