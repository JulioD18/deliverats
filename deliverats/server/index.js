import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { sequelize } from "./datasource.js";
import { formsRouter } from "./routers/forms_router.js";
import { deliveriesRouter } from "./routers/deliveries_router.js";
import { emailRouter } from "./routers/email_router.js";
import { smsRouter } from "./routers/sms_router.js";
import { updateEmailDeliveryStatus } from "./controllers/email_controller.js";
import { updateSmsDeliveryStatus } from "./controllers/sms_controller.js";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const IO_PORT = 3002;
const server = http.createServer(app);
const io = new Server(server, { cors: "*" }).listen(IO_PORT);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("receive trackId", ({trackId, method}) => {
    switch (method) {
      case "email":
        updateEmailDeliveryStatus(trackId);
        break;
      case "sms":
        updateSmsDeliveryStatus(trackId);
        break;
      default:
        break;
    }
  })

  socket.on("disconnect", () => {
    socket.removeAllListeners();
    socket.disconnect();
    console.log("user disconnected");
  });
});

const sentryDsn = process.env.REACT_APP_SENTRY_DSN;

Sentry.init({
  dsn: sentryDsn,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.use("/forms", formsRouter());
app.use("/deliveries", deliveriesRouter(io));
app.use("/email", emailRouter(io));
app.use("/sms", smsRouter(io));

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
