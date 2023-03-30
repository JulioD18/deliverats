import { Delivery } from "../models/deliveries.js";
import { Router } from "express";
import { io } from "../index.js";

export const emailRouter = Router();

/**
 * Works with webhooks to be informed when an email is delivered and failed to be sent
 * As such, it can inform the user via the UI the current status of the email
 */
emailRouter.post("/events", async (req, res) => {
  const body = req.body;
  const eventReceived = body[0].event;

  io.emit("send trackId");

  io.on("connection", (socket) => {
    if (eventReceived === "delivered") {
      socket.on("receive trackId", async (trackId) => {
        await Delivery.update(
          {
            emailDelivered: true,
          },
          {
            where: { id: trackId },
          }
        );
      });

      io.emit("email delivered");
    }
  });

  console.log("Email event received: ", eventReceived);
  return res.json({ eventReceived, message: "Email was delivered!" });
});
