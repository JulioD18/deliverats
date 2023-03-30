import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { connect } from "react-redux";
import { getForm } from "../../redux/actions/form-action";
import { postDelivery } from "../../redux/actions/delivery-action";
import { useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { formatDelivery } from "../form-utils/format-utils.js";

import Menu from "./menu";
import ClientDetails from "./client-details";
import LocationPicker from "./location-picker";
import OrderSummary from "./order-summary";

import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/system";

const steps = ["Menu", "Client Details", "Location", "Order Summary"];
const libraries = ["places"];
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Form = ({ form, getForm, postDelivery }) => {
  const { formId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState();
  const [coordinates, setCoordinatesVal] = useState();
  const [attempt, setAttempt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: null,
    suite: "",
    latitude: null,
    longitude: null,
    items: {},
    total: 0,
    owner: null,
  });

  const theme = useTheme();
  const navigate = useNavigate();

  useJsApiLoader({
    id: "google-map-script",
    libraries: libraries,
    googleMapsApiKey,
  });

  function setCoordinates(coordinates, address = undefined) {
    setCoordinatesVal(coordinates);
    const newFormValue = { ...formValues };
    if (address !== undefined) newFormValue.address = address;
    newFormValue.latitude = coordinates.lat();
    newFormValue.longitude = coordinates.lng();
    setFormValues(newFormValue);
  }

  function handleBack() {
    setAttempt(false);
    setError(undefined);
    setActiveStep(activeStep - 1);
  }

  function handleNext() {
    if (error !== undefined) {
      setAttempt(true);
    } else if (formValues.total <= 0) {
      setError("Please select at least one item");
      setAttempt(true);
    } else {
      setAttempt(false);
      setError(undefined);
      setActiveStep(activeStep + 1);
      if (activeStep === steps.length - 1) placeOrder();
    }
  }

  async function placeOrder() {
    const delivery = formatDelivery({ form, formValues });
    const res = await postDelivery({ delivery });
    navigate(`/track/${res.payload.id}`);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Menu
            form={form}
            formValues={formValues}
            setFormValues={setFormValues}
            setError={setError}
          />
        );
      case 1:
        return (
          <ClientDetails
            formValues={formValues}
            setFormValues={setFormValues}
            setCoordinates={setCoordinates}
            setError={setError}
            attempt={attempt}
          />
        );
      case 2:
        return (
          <LocationPicker
            coordinates={coordinates}
            setCoordinates={setCoordinates}
          />
        );
      default:
        return <OrderSummary values={formatDelivery({ form, formValues })} />;
    }
  }

  useEffect(() => {
    if (!fetched) {
      getForm(formId);
      setFetched(true);
    } else {
      setLoading(false);
    }
  }, [form, formId, getForm]);

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
          {form?.name ?? "Loading Form..."}
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {!loading && (
          <React.Fragment>
            {getStepContent(activeStep)}
            {error && attempt && (
              <Typography sx={{ color: "red", textAlign: "center" }} mt={2.5}>
                {error}
              </Typography>
            )}
            {activeStep < steps.length && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: activeStep > 0 ? "space-between" : "flex-end",
                }}
                mt={5}
                mx="auto"
              >
                {activeStep > 0 && (
                  <Button variant="contained" onClick={handleBack}>
                    Back
                  </Button>
                )}
                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Place Order" : "Next"}
                </Button>
              </Box>
            )}
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
  form: state.form.form,
});

export default connect(mapStateToProps, { getForm, postDelivery })(Form);
