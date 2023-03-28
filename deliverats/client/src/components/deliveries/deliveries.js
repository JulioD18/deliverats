import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getDeliveries } from "../../redux/actions/delivery-action";
import { useAuth0 } from "@auth0/auth0-react";

import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { Link } from "react-router-dom";

const deliveryLimit = 8;

const Deliveries = ({ deliveries, getDeliveries }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const { sub } = user;
  const [offset, setOffset] = useState(0);

  const theme = useTheme();
  const navigate = useNavigate();

  const paginationChange = (event, value) => {
    setOffset((value - 1) * deliveryLimit);
  };

  const newDelivery = () => {
    navigate("/delivery-builder");
  };

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      await getDeliveries({ token, sub, offset, limit: deliveryLimit });
    })();
  }, [!deliveries, offset]);

  return (
    <Container component="main">
      {!deliveries?.deliveries && (
        <Grid
          container
          mt={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CircularProgress size="4rem" sx={{ marginTop: "35vh" }} />
        </Grid>
      )}
      {deliveries?.deliveries && (
        <Grid container spacing={3} mt={2}>
          {deliveries.deliveries.length > 0 &&
            deliveries.deliveries.map((delivery) => (
              <Grid item key={delivery.id} style={{ width: "25%" }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: {
                      xs: 2,
                      md: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "100%",
                    },
                  }}
                >
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    <DeliveryDiningIcon />
                  </Avatar>
                  <Typography component="h6" align="center" my={1.5}>
                    {delivery.name}
                  </Typography>
                  <Button
                    as={Link}
                    variant="contained"
                    to={`/deliveries/${delivery.id}`}
                    sx={{ textDecoration: "none" }}
                  >
                    View Delivery
                  </Button>
                </Paper>
              </Grid>
            ))}
          {deliveries.count > deliveryLimit && (
            <Grid item container sx={{ justifyContent: "center" }}>
              <Pagination
                count={Math.ceil(deliveries.count / deliveryLimit)}
                sx={{ marginTop: "20px" }}
                size="large"
                showFirstButton
                showLastButton
                onChange={paginationChange}
              />
            </Grid>
          )}
          {deliveries.deliveries.length === 0 && (
            <Grid item container sx={{ justifyContent: "center" }}>
              <Grid item container sx={{ justifyContent: "center" }}>
                <SearchOffIcon sx={{ fontSize: 100 }} />
              </Grid>
              <Grid item container sx={{ justifyContent: "center" }} mt={2}>
                <Typography variant="h6" component="h6">
                  No deliveries found
                </Typography>
              </Grid>
              <Grid item container sx={{ justifyContent: "center" }} mt={4}>
                <Button onClick={newDelivery} variant="contained">
                  Create Delivery
                </Button>
              </Grid>
            </Grid>
          )}
          {deliveries.deliveries.length > 0 && (
            <Fab
              size="large"
              onClick={newDelivery}
              color="primary"
              sx={{ position: "fixed", bottom: "40px", right: "40px" }}
            >
              <AddIcon />
            </Fab>
          )}
        </Grid>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  deliveries: state.delivery.deliveries,
});

export default connect(mapStateToProps, { getDeliveries })(Deliveries);
