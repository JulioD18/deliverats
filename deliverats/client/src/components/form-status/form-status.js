import React, { useEffect, useState, useRef, useCallback } from "react";
import io from "socket.io-client";

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
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import GetAppIcon from "@mui/icons-material/GetApp";

import OrderSummary from "../form/order-summary";

import { useTheme } from "@mui/material/styles";
import { ColorlibConnector, ColorlibStepIcon } from "./form-status-connectors";
import { useLocation } from "react-router-dom";

import { connect } from "react-redux";
import { getDelivery, getPDF } from "../../redux/actions/delivery-action";
import { formatDelivery } from "../form-utils/format-utils";

import * as pdfjs from "pdfjs-dist/webpack";

const socket = io("http://localhost:3002");

const FormStatus = ({ delivery, getDelivery, getPDF }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const canvasRef = useRef(null);

  const steps = [
    "Order Received",
    "Order Accepted",
    "Order Ready",
    "Order Delivered",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [summary, setSummary] = useState();
  const [pdfData, setPdfData] = useState(null);
  const [pdfView, setPdfView] = useState(false);

  const trackId = useLocation().pathname.split("/")[2];

  const theme = useTheme();

  const deliveryStatus = (status) => {
    switch (status) {
      case "received":
        setActiveStep(0);
        break;
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

  const loadPdf = useCallback(async () => {
    const data = await getPDF(trackId);
    setPdfData(new Uint8Array(data));
  }, [getPDF, trackId]);

  const renderPdf = useCallback(async () => {
    if (!pdfData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const pdfDataCopy = pdfData.slice(); // Make a copy of the pdfData state
    const pdf = await pdfjs.getDocument(pdfDataCopy).promise;
    const page = await pdf.getPage(1);
    const scale = 3;
    const viewport = page.getViewport({ scale });
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
  }, [pdfData, canvasRef]);

  const downloadPdf = () => {
    const url = URL.createObjectURL(
      new Blob([pdfData], { type: "application/pdf" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `receipt#${trackId}.pdf`);
    document.body.appendChild(link);
    link.click();
  };

  const onPdfView = () => {
    setPdfView(!pdfView);
  };

  useEffect(() => {
    (async () => {
      if (!delivery || delivery.id !== Number(trackId))
        await getDelivery(trackId);

      setEmailSent(delivery.emailDelivered);
      setSmsSent(delivery.smsDelivered);
      deliveryStatus(delivery.status);
      setSummary(formatDelivery({ formValues: delivery }));

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
        if (deliveryId === Number(trackId)) {
          deliveryStatus(status);
        }
      });
    })();
  }, [getDelivery, trackId, delivery, emailSent, smsSent]);

  useEffect(() => {
    if (!pdfData) loadPdf();
  }, [pdfData, loadPdf]);

  useEffect(() => {
    if (pdfView) renderPdf();
  }, [pdfView, renderPdf]);

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
        <Divider mt={4} sx={{ fontSize: "1.5rem" }}>
          TRACK ORDER
        </Divider>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          sx={{ mt: 2 }}
          my={8}
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

        <Box mt={4} mb={0} mx={10} heigth="80%">
          {summary && <OrderSummary values={summary} />}
        </Box>

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

        <Box display="flex" justifyContent="center" alignItems="center" my={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              boxShadow: "none",
              fontWeight: "bold",
            }}
            onClick={onPdfView}
          >
            See Receipt
          </Button>
        </Box>

        {pdfView && (
          <Box display="grid" justifyContent="center">
            <canvas ref={canvasRef} style={{ height: "100vh" }} />
            <Button
              variant="contained"
              startIcon={<GetAppIcon />}
              onClick={downloadPdf}
            >
              Download Receipt
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  delivery: state.delivery.delivery,
  receipt: state.delivery.receipt,
});

export default connect(mapStateToProps, { getDelivery, getPDF })(FormStatus);
