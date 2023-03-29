import React, { useState } from "react";

import { postForm } from "../../redux/actions/form-action";
import { useAuth0 } from "@auth0/auth0-react";
import { connect } from "react-redux";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Details from "./details.js";
import Categories from "./categories.js";
import Items from "./items.js";
import Options from "./options.js";
import Share from "./share.js";

import { useNavigate } from "react-router-dom";

const steps = ["Details", "Categories", "Items", "Options"];

const FormBuilder = ({ postForm }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(true);
  const [attempt, setAttempt] = useState(false);
  const [formLink, setFormLink] = useState();
  const [formValues, setFormValues] = useState({
    name: "",
    email: undefined,
    phone: undefined,
    categories: [],
    items: [],
    options: [],
  });

  const theme = useTheme();

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
        return <Share formLink={formLink} />;
    }
  }

  const { user, getAccessTokenSilently } = useAuth0();

  async function createForm() {
    const token = await getAccessTokenSilently();
    const res = await postForm({ user, token, form: formValues });
    setFormLink(`${window.location.origin}/forms/${res.payload.id}`);
  }

  function handleNext() {
    if (error) {
      setAttempt(true);
    } else {
      setAttempt(false);
      setError(true);
      setActiveStep(activeStep + 1);
      if (activeStep === steps.length - 1) createForm();
    }
  }

  function handleBack() {
    if (activeStep === 0) {
      navigate("/forms");
    } else {
      setActiveStep(activeStep - 1);
    }
  }

  const navigate = useNavigate();

  return (
    <Container component="main" sx={{ my: 4 }}>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, md: 3 },
          backgroundColor: theme.palette.tertiary.main,
        }}
      >
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
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
              my={5}
              mx="auto"
            >
              <Button variant="contained" onClick={handleBack}>
                {activeStep === 0 ? "Cancel" : "Back"}
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Create form" : "Next"}
              </Button>
            </Box>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
};

export default connect(undefined, { postForm })(FormBuilder);
