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

export default function Item({ element, index, handleChange, removeField }) {
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
            <Typography gutterBottom>Item {index + 1}</Typography>
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
              label="Name"
              fullWidth
              variant="standard"
              onChange={(e) => handleChange(index, e)}
              value={element.name ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              variant="standard"
              sx={{ minWidth: "100%", maxWidth: "100%" }}
            >
              <InputLabel id="categoryLabel">Category</InputLabel>
              <Select
                labelId="categoryLabel"
                name="category"
                value={element.category ?? ""}
                onChange={(e) => handleChange(index, e)}
              >
                <MenuItem value={"single-answer"}>
                  Options (Single answer)
                </MenuItem>
                <MenuItem value={"multiple-answer"}>
                  Options (Multiple answers)
                </MenuItem>
                <MenuItem value={"checkbox"}>Checkbox</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              fullWidth
              variant="standard"
              value={element.description ?? ""}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
