import React from "react";

import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

export default function MenuOption({
  formValues,
  option,
  item,
  optionSelect,
  formatter,
}) {
  return (
    <React.Fragment>
      <Grid container key={option.name}>
        <FormControlLabel
          disabled={formValues.items[item.name] === undefined}
          sx={
            formValues.items[item.name] === undefined
              ? { color: "action.active" }
              : {}
          }
          label={
            <Typography sx={{ fontSize: ".9em" }}>
              {option.name + " (+" + formatter.format(option.price) + ")"}
            </Typography>
          }
          control={
            <Checkbox
              onChange={(e) =>
                optionSelect(option, item.name, e.target.checked)
              }
              checked={
                formValues.items[item.name]?.options[option.name] !== undefined
              }
            />
          }
        />
      </Grid>
    </React.Fragment>
  );
}
