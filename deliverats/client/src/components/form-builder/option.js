import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
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
          <Typography variant="h6">Option {index + 1}</Typography>
          <IconButton variant="outlined" onClick={() => removeField(index)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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
                error={
                  attempt && (!element.items || element.items.length === 0)
                }
                helperText={
                  attempt && (!element.items || element.items.length === 0)
                    ? "Required"
                    : ""
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="standard" required sx={{ width: "100%" }}>
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
