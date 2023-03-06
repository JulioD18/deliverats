import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormDetails from "./FormDetails";
import FormConstruct from "./FormConstruct";
import FormShare from "./FormShare";

const steps = ["Details", "Construct", "Share"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FormDetails />;
    case 1:
      return <FormConstruct />;
    default:
      return <FormShare />;
  }
}

export default function FormBuilder() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // TODO: Routing to forms page
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ p: { xs: 2, md: 3 } }}
      >
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
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === 1
                ? "Create Form"
                : activeStep === steps.length - 1
                ? "Finish"
                : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
}
