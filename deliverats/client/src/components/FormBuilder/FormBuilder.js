import React, { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Details from "./Details";
import Categories from "./Categories";
import Items from "./Items";
import Share from "./Share";

const steps = ["Details", "Categories", "Items"];

export default function FormBuilder() {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    email: undefined,
    phone: undefined,
    categories: [],
    items: [],
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Details formValues={formValues} setFormValues={setFormValues} />
        );
      case 1:
        return (
          <Categories formValues={formValues} setFormValues={setFormValues} />
        );
      case 2:
        return <Items formValues={formValues} setFormValues={setFormValues} />;
      default:
        return <Share />;
    }
  }

  const handleNext = () => {
    if (activeStep >= steps.length) {
      // TODO: Routing to forms page
    } else {
      setActiveStep(activeStep + 1);
    }
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
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
}
