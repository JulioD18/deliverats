import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import MenuOption from "./menu-option";

export default function MenuItem({
  formValues,
  changeQuantity,
  optionSelect,
  item,
  formatter,
}) {
  return (
    <React.Fragment>
      <Paper
        key={item.name}
        variant="outlined"
        sx={{ my: { xs: 2, md: 3 }, p: { xs: 2, md: 3 } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Typography component="h5" variant="h5">
            {item.name}
          </Typography>
          <Typography component="p" variant="h6">
            {formatter.format(item.price)}
          </Typography>
        </Box>
        <Typography component="p" mt={2}>
          {item.description}
        </Typography>
        {item.options && (
          <Typography component="p" mt={2}>
            Options:
          </Typography>
        )}
        {item.options &&
          item.options.map((option) => (
            <MenuOption
              key={option.name}
              formValues={formValues}
              option={option}
              item={item}
              optionSelect={optionSelect}
              formatter={formatter}
            />
          ))}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonGroup size="small">
            <Button
              sx={{ color: "black" }}
              onClick={() => changeQuantity(item, -1)}
              disabled={item.counter <= 0}
            >
              -
            </Button>
            <Button
              disabled
              sx={{
                color: "black !important",
                borderColor: "rgba(42, 43, 44, 0.5) !important",
              }}
            >
              {formValues.items[item.name]?.quantity ?? 0}
            </Button>
            <Button
              sx={{ color: "black" }}
              onClick={() => changeQuantity(item, 1)}
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
