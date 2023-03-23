import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Item({
  categories,
  element,
  index,
  handleChange,
  removeField,
  attempt,
}) {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mb={1.5}
        >
          <Typography variant="h6">Item {index + 1}</Typography>
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
            onChange={(e) => handleChange(index, e.target.name, e.target.value)}
            value={element.name ?? ""}
            error={attempt && (element.name === "" || !element.name)}
            helperText={
              attempt && (element.name === "" || !element.name)
                ? "Required"
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="standard" fullWidth required>
            <InputLabel
              style={attempt && !element.category ? { color: "#d32f2f" } : {}}
              id="categoryLabel"
            >
              Category
            </InputLabel>
            <Select
              labelId="categoryLabel"
              name="category"
              value={element.category ?? ""}
              onChange={(e) =>
                handleChange(index, e.target.name, e.target.value)
              }
              error={attempt && !element.category}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            {attempt && !element.category && (
              <FormHelperText style={{ color: "#d32f2f" }}>
                Required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            required
            name="description"
            label="Description"
            fullWidth
            variant="standard"
            value={element.description ?? ""}
            onChange={(e) => handleChange(index, e.target.name, e.target.value)}
            error={
              attempt && (element.description === "" || !element.description)
            }
            helperText={
              attempt && (element.description === "" || !element.description)
                ? "Required"
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl variant="standard" required fullWidth>
            <InputLabel
              htmlFor="price"
              style={
                attempt && (!element.price || element.price === "")
                  ? { color: "#d32f2f" }
                  : {}
              }
            >
              Price
            </InputLabel>
            <Input
              id="price"
              name="price"
              type="number"
              value={element.price ?? ""}
              onChange={(e) =>
                handleChange(index, e.target.name, e.target.value)
              }
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
            {attempt && (!element.price || element.preice === "") && (
              <FormHelperText style={{ color: "#d32f2f" }}>
                Required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
