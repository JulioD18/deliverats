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

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
export const io = new Server(server);

Sentry.init({
  dsn: "https://a771fa69fcb74977b17d20e40ec7c43e@o4504838835404800.ingest.sentry.io/4504838968246272",
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

app.use("/api/forms", formsRouter);
app.use("/api/deliveries", deliveriesRouter);
app.use("/api/email", emailRouter);
app.use("/api/sms", smsRouter);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
