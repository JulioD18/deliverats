import React from "react";

import MenuCategory from "./menu-category";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Menu({ form, formValues, setFormValues, setError }) {
  const menu = buildMenu(form);

  /**
   * Builds the menu object from the form object
   * @param {Object} form
   * @returns The menu object
   */
  function buildMenu(form) {
    const itemOptions = {};
    for (let option of form.options) {
      for (let item of option.items) {
        if (itemOptions[item] === undefined) itemOptions[item] = [];
        const newOption = { ...option };
        delete newOption.items;
        itemOptions[item].push(newOption);
      }
    }
    const menu = {};
    for (let item of form.items) {
      const category = item.category;
      if (!menu[category]) menu[category] = [];
      const extendedItem = {
        ...item,
        options: itemOptions[item.name],
      };
      menu[category].push(extendedItem);
    }
    return menu;
  }

  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  return (
    <React.Fragment>
      <Typography variant="h5" mb={5}>
        Select your items:
      </Typography>
      {form.categories.map((category, i) => (
        <Accordion
          color="primary"
          key={category}
          sx={
            i === 0
              ? {
                  borderRadius:
                    form.categories.length === 1 ? "15px" : "15px 15px 0 0",
                  "&:before": {
                    display: "none",
                  },
                }
              : i === form.categories.length - 1
              ? { borderRadius: "0 0 15px 15px" }
              : {}
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MenuCategory
              formValues={formValues}
              setFormValues={setFormValues}
              items={menu[category]}
              formatter={formatter}
              setError={setError}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      <Typography component="p" mt={3}>
        Total: {formatter.format(formValues.total)}
      </Typography>
    </React.Fragment>
  );
}
