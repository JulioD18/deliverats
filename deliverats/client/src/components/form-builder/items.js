import React, { useEffect } from "react";
import Item from "./item.js";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";

export default function Items({
  formValues,
  setFormValues,
  attempt,
  setError,
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
   * @param {string} name The name of the field to update
   * @param {any} value The value of the field to update
   */
  function handleChange(i, name, value) {
    const items = [...formValues.items];
    items[i][name] = value;
    setItems(items);
  }

  useEffect(() => {
    const validateFields = () => {
      let error = false;
      if (formValues.items.length === 0) error = true;
      for (let item of formValues.items) {
        if (
          !item.name ||
          item.name === "" ||
          !item.category ||
          item.category === "" ||
          !item.description ||
          item.description === "" ||
          !item.price ||
          item.price === ""
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
            attempt={attempt}
            key={index}
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
