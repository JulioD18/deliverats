import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

import { ColorlibConnector, ColorlibStepIcon } from "./form-status-connectors";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { connect } from "react-redux";
import { getDelivery } from "../../redux/actions/delivery-action";

const FormStatus = ({ delivery, getDelivery }) => {
  const steps = [
    "Order Received",
    "Order Accepted",
    "Order Ready",
    "Order Delivered",
  ];
  const [activeStep, setActiveStep] = useState(0);

  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  const trackId = useLocation().pathname.split("/")[2];

  const theme = useTheme();

  const deliveryStatus = (status) => {
    switch (status) {
      case "accepted":
        setActiveStep(1);
        break;
      case "ready":
        setActiveStep(2);
        break;
      case "delivered":
        setActiveStep(3);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3002");

    (async () => {
      await getDelivery(trackId);
      if (delivery) {
        setEmailSent(delivery.emailDelivered);
        setSmsSent(delivery.smsDelivered);
        deliveryStatus(delivery.status);

        socket.on("send trackId", () => {
          socket.emit("receive trackId", trackId);
        });

        if (!emailSent) {
          socket.on("sms delivered", () => {
            setSmsSent(true);
          });
        }

        if (!smsSent) {
          socket.on("email delivered", () => {
            setEmailSent(true);
          });
        }

        socket.on("delivery status", ({ deliveryId, status }) => {
          if (deliveryId === trackId) {
            deliveryStatus(status);
          }
        });
      }
    })();
  }, [!delivery]);

  return (
    <Container component="main" sx={{ my: 4 }}>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, md: 3 },
          backgroundColor: theme.palette.tertiary.main,
        }}
        spacing={20}
      >
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          sx={{ mt: 2 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                mx={{ size: "10em" }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          display="flex"
          justifyContent="space-between"
          mt={4}
          mb={0}
          mx="auto"
          width="20%"
          heigth="80%"
        >
          <Stack display="flex" justifyContent="center" alignItems="center">
            <EmailIcon sx={{ width: "80%", height: "40%" }}> </EmailIcon>
            {emailSent ? <CheckIcon /> : <CircularProgress size="1rem" />}
          </Stack>
          <Stack display="flex" justifyContent="center" alignItems="center">
            <SmsIcon sx={{ width: "80%", height: "40%" }} />
            {smsSent ? <CheckIcon /> : <CircularProgress size="1rem" />}
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  delivery: state.delivery.delivery,
});

export default connect(mapStateToProps, { getDelivery })(FormStatus);
