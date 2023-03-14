import React, { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Details from "./details.js";
import Categories from "./categories.js";
import Items from "./items.js";
import Options from "./options.js";
import Share from "./share.js";

import { useNavigate } from "react-router-dom";

const steps = ["Details", "Categories", "Items", "Options"];

const FormBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(true);
  const [attempt, setAttempt] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    email: undefined,
    phone: undefined,
    categories: [],
    items: [],
    options: [],
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Details
            formValues={formValues}
            setFormValues={setFormValues}
            attempt={attempt}
            setError={setError}
          />
        );
      case 1:
        return (
          <Categories
            formValues={formValues}
            setFormValues={setFormValues}
            attempt={attempt}
            setError={setError}
          />
        );
      case 2:
        return (
          <Items
            formValues={formValues}
            setFormValues={setFormValues}
            attempt={attempt}
            setError={setError}
          />
        );
      case 3:
        return (
          <Options
            formValues={formValues}
            setFormValues={setFormValues}
            attempt={attempt}
            setError={setError}
          />
        );
      default:
        return <Share form={formValues} />;
    }
  }

  const handleNext = () => {
    if (error) {
      setAttempt(true);
    } else {
      setAttempt(false);
      setError(true);
      setActiveStep(activeStep + 1);
    }
  };

  const navigate = useNavigate();

  const cancel = () => {
    navigate('/my-forms');
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Build your form
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {getStepContent(activeStep)}
          {activeStep < steps.length && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                onClick={cancel}
                sx={{ mt: 3, ml: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Create form" : "Next"}
              </Button>
            </Box>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
};

export default FormBuilder;
