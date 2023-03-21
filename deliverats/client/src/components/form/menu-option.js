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
        <Grid item container>
          <FormControlLabel
            label={option.name + " (+" + formatter.format(option.price) + ")"}
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
        <Grid item container>
          <Typography component="p" ml={4}>
            {option.description}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
