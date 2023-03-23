import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

/**
 * IMPORTANT!
 * Some of the code on this file was copied from
 * https://www.npmjs.com/package/@react-google-maps/api
 */

const containerStyle = {
  width: "100%",
  height: "400px",
};

function LocationPicker({ coordinates, setCoordinates }) {
  const [map, setMap] = useState(null);

  function centerChanged() {
    if (!map) return;
    const newCenter = map.getCenter();
    setCoordinates(newCenter);
  }

  return (
    <React.Fragment>
      <Typography variant="h5" mb={4}>
        Pick delivery location
      </Typography>
      <Grid container>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={18}
          onLoad={(map) => {
            setMap(map);
            map.setCenter(coordinates);
          }}
          onCenterChanged={centerChanged}
        >
          <Marker
            cursor="default"
            position={coordinates}
            animation={window.google.maps.Animation.DROP}
          />
          <></>
        </GoogleMap>
      </Grid>
    </React.Fragment>
  );
}

export default React.memo(LocationPicker);
