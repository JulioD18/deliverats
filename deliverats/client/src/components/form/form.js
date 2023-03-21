import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { connect } from "react-redux";
import { getForm } from "../../redux/actions/form-action";

import Menu from "./menu";
import ClientDetails from "./client-details";
import OrderSummary from "./order-summary";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/system";

const steps = ["Menu", "Client Details", "Order Summary"];

const Form = ({ getForm }) => {
  const { formId } = useParams();
  const [form, setForm] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState();
  const [attempt, setAttempt] = useState(false);
  const [formValues, setFormValues] = useState({
    client: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      address2: "",
    },
    items: {},
    total: 0,
  });

  const [menu, setMenu] = useState(
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    </React.Fragment>
  );

  function getStepContent(step) {
    switch (step) {
      case 0:
        return menu;
      case 1:
        return (
          <ClientDetails
            formValues={formValues}
            setFormValues={setFormValues}
            setError={setError}
            attempt={attempt}
          />
        );
      default:
        return <OrderSummary formValues={formValues} />;
    }
  }

  function getValues(dictionary) {
    const values = [];
    for (let key in dictionary) values.push(dictionary[key]);
    return values;
  }

  function placeOrder() {
    // Format object
    const values = JSON.parse(JSON.stringify(formValues));
    values.items = getValues(values.items);
    for (let item of values.items) {
      item.options = getValues(item.options);
    }
    // Send to server
    console.log(values);
  }

  const handleNext = () => {
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
  };

  useEffect(() => {
    (async () => {
      const res = await getForm(formId);
      const form = res.payload;
      setForm(form);
    })();
  }, [formId, getForm]);

  useEffect(() => {
    if (form) {
      setMenu(
        <Menu
          form={form}
          formValues={formValues}
          setFormValues={setFormValues}
          setError={setError}
        />
      );
    }
  }, [formValues, form]);

  return (
    <Container component="main" sx={{ mt: 4, mb: 2 }}>
      <Paper
        variant="outlined"
        sx={{ p: { xs: 2, md: 3 }, backgroundColor: "#f0f0f0" }}
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
        <React.Fragment>
          {error && attempt && (
            <Typography sx={{ color: "red", textAlign: "center" }}>
              {error}
            </Typography>
          )}
          {getStepContent(activeStep)}
          {activeStep < steps.length && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place Order" : "Next"}
              </Button>
            </Box>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  forms: state.form.forms,
});

export default connect(mapStateToProps, { getForm })(Form);
