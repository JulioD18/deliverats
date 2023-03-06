import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FormField({
  element,
  index,
  handleChange,
  removeField,
}) {
  return (
    <React.Fragment>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 2, md: 3 }, p: { xs: 2, md: 3 } }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom>Field {index + 1}</Typography>
            <IconButton variant="outlined" onClick={() => removeField(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              name="name"
              label="Field Name"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(index, e)}
              value={element.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              variant="standard"
              sx={{ minWidth: "100%", maxWidth: "100%" }}
            >
              <InputLabel id="typeLabel">Type</InputLabel>
              <Select
                labelId="typeLabel"
                value={element.type}
                onChange={(e) => handleChange(index, e)}
                label="Type"
              >
                <MenuItem value={"select"}>
                  Multiple choice (Single answer)
                </MenuItem>
                <MenuItem value={20}>
                  Multiple choice (Multiple answers)
                </MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
