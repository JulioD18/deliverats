import React from "react";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";

export default function OrderSummary({ values }) {
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List dense>
        {values.items.map((item) => (
          <Box key={item.name}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <RestaurantIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name + " (x" + item.quantity + ")"}
                secondary={formatter.format(item.price * item.quantity)}
              />
            </ListItem>
            {item.options.length > 0 && <List dense sx={{ marginLeft: "55px" }}>
              {item.options.map((option) => (
                <ListItem key={option.name}>
                  <ListItemAvatar>
                    <Avatar>
                      <AddIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={option.name + " (x" + item.quantity + ")"}
                    secondary={formatter.format(option.price * item.quantity)}
                  />
                </ListItem>
              ))}
            </List>}
          </Box>
        ))}
      </List>
      <Typography component="p" mt={2}>
        Total: {formatter.format(values.total)}
      </Typography>
    </React.Fragment>
  );
}
