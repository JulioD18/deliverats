import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";

/**
 * IMPORTANT!
 * Some of the code on this file was copied from
 * https://mui.com/material-ui/react-autocomplete/#google-maps-place
 */

const mapsService = { autocomplete: null, geocoder: null };

export default function MapsAutocomplete({ value, setValue, attempt }) {
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        mapsService.autocomplete.getPlacePredictions(request, callback);
      }, 150),
    []
  );

  const fetchCoordinates = React.useMemo(
    () =>
      debounce((request, callback) => {
        mapsService.geocoder.geocode(request, callback);
      }, 150),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!mapsService.autocomplete && window.google) {
      mapsService.autocomplete =
        new window.google.maps.places.AutocompleteService();
    }
    if (!mapsService.geocoder && window.google) {
      mapsService.geocoder = new window.google.maps.Geocoder();
    }
    if (!mapsService.autocomplete || !mapsService.geocoder) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  function onChange(event, newValue) {
    setOptions(newValue ? [newValue, ...options] : options);
    if (!newValue?.place_id) {
      fetchCoordinates({ address: newValue }, (results) => {
        let coordinates;
        if (results && results.length > 0)
          coordinates = results[0].geometry.location;
        else coordinates = { lat: () => 43.662639, lng: () => -79.391687 };
        setValue({ address: newValue?.description ?? newValue, coordinates });
      });
    } else {
      fetchCoordinates({ placeId: newValue.place_id }, (results) => {
        setValue({
          address: newValue?.description ?? newValue,
          coordinates: results[0].geometry.location,
        });
      });
    }
  }

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      freeSolo
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={onChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Address"
          fullWidth
          required
          variant="standard"
          error={attempt && value === null}
          helperText={attempt && value === null ? "Required" : ""}
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option?.structured_formatting?.main_text_matched_substrings ?? [];

        const parts = parse(
          option?.structured_formatting?.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
