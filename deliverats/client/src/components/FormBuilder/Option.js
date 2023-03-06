import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Option({
  items,
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
            <Typography gutterBottom>Option {index + 1}</Typography>
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
              onChange={(e) =>
                handleChange(index, e.target.name, e.target.value)
              }
              value={element.name ?? ""}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              multiple
              options={items.map((item) => item.name)}
              limitTags={1}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              onChange={(e, val) => handleChange(index, "items", val)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Apply to"
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              name="description"
              label="Description"
              fullWidth
              variant="standard"
              value={element.description ?? ""}
              onChange={(e) =>
                handleChange(index, e.target.name, e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="standard">
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input
                id="price"
                name="price"
                value={element.price ?? ""}
                onChange={(e) =>
                  handleChange(index, e.target.name, e.target.value)
                }
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
