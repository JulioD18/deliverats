import React from "react";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";

export default function Client({ delivery }) {
  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Client Details
      </Typography>
      <List
        dense
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <ListItem sx={{ width: "fit-content" }}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={delivery.name + " " + delivery.lastName} />
        </ListItem>
        <ListItem sx={{ width: "fit-content" }}>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={delivery.email} />
        </ListItem>
        <ListItem sx={{ width: "fit-content" }}>
          <ListItemAvatar>
            <Avatar>
              <PhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={formatPhoneNumber(delivery.phone)} />
        </ListItem>
        <ListItem sx={{ width: "fit-content" }}>
          <ListItemAvatar>
            <Avatar>
              <PlaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={delivery.address} secondary={delivery.suite} />
        </ListItem>
      </List>
    </React.Fragment>
  );
}
