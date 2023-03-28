import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { connect } from "react-redux";
import { getDelivery } from "../../redux/actions/delivery-action";
import { useJsApiLoader } from "@react-google-maps/api";

import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

const GOOGLE_MAPS_API_KEY = "AIzaSyCKhtQNMW0qP-CPly_PXjdLEvRnpZ2fo4U";
const libraries = ["places"];

const Delivery = ({ delivery, getDelivery }) => {
  const { deliveryId } = useParams();
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  useJsApiLoader({
    id: "google-map-script",
    libraries: libraries,
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!delivery || delivery.id !== parseInt(deliveryId)) getDelivery(deliveryId);
    else setLoading(false);
  }, [delivery, deliveryId, getDelivery]);

  return (
    <Container component="main" sx={{ my: 4 }}>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, md: 3 },
          backgroundColor: theme.palette.tertiary.main,
        }}
      >
        <Typography component="h1" variant="h4" align="center" my={2}>
          {delivery?.name ?? "Loading Delivery..."}
        </Typography>
        {!loading && (
          <React.Fragment>
          </React.Fragment>
        )}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size="4rem" sx={{ margin: "10vh 0" }} />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  delivery: state.delivery.delivery,
});

export default connect(mapStateToProps, { getDelivery })(Delivery);
