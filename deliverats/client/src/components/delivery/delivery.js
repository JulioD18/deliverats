import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import OrderSummary from "../form/order-summary";
import Client from "./client";

import { connect } from "react-redux";
import { getDelivery } from "../../redux/actions/delivery-action";
import { patchDelivery } from "../../redux/actions/delivery-action";

import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Delivery = ({ delivery, getDelivery, patchDelivery }) => {
  const { deliveryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);
  const [status, setStatus] = useState("");

  const theme = useTheme();

  const changeStatus = (val) => {
    setStatus(val);
  };

  const { getAccessTokenSilently } = useAuth0();

  const updateStatus = async () => {
    const token = await getAccessTokenSilently();
    patchDelivery(token, delivery.id, { status: status });
    setLoading(true);
  };

  useEffect(() => {
    if (!fetched) {
      getDelivery(deliveryId);
      setFetched(true);
    } else {
      setLoading(false);
      setStatus(delivery.status);
    }
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
        {!loading && (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Order Status
            </Typography>
            <FormControl
              variant="standard"
              sx={{ m: "10px 0 20px 0", minWidth: 120 }}
            >
              <Select
                labelId="statusLabel"
                value={status}
                onChange={(e) => changeStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="received">Received</MenuItem>
                <MenuItem value="accepted">Accepted</MenuItem>
                <MenuItem value="ready">Ready</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
              </Select>
            </FormControl>
            {delivery.status !== status && (
              <Button
                variant="contained"
                onClick={updateStatus}
                sx={{ m: "8px 0 20px 20px" }}
              >
                Update
              </Button>
            )}
            <Client delivery={delivery} />
            <OrderSummary values={delivery} />
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

export default connect(mapStateToProps, { getDelivery, patchDelivery })(
  Delivery
);
