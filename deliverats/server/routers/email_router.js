import { Delivery } from "../models/deliveries.js";
import { Router } from "express";

export const emailRouter = Router();

let socket;

/**
 * Works with webhooks to be informed when an email is delivered and failed to be sent
 * As such, it can inform the user via the UI the current status of the email
 */
emailRouter.post("/events", async (req, res) => {
  const body = req.body;
  const eventReceived = body[0].event;

  (async () => {
    if (eventReceived === "delivered") {
      socket.emit("send trackId");
      socket.on("receive trackId", async(trackId) => {
        await Delivery.update(
          {
            emailDelivered: true,
          },
          {
            where: { id: trackId },
          }
        );
      });
      socket.emit("email delivered", true);
    }
  })();

  return res.json({ eventReceived, message: "Email was delivered!" });
});

export const setEmailSocket = (sock) => {
  socket = sock;
}
