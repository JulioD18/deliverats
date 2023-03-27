import { Router } from "express";
import { Delivery } from "../models/deliveries.js";

export const smsRouter = Router();

let socket;

/**
 * Works with webhooks to be informed whem a message is send, delievered and undeliered
 * As such, it can inform the user via the UI the current status of the message
 */
smsRouter.post("/events", async (req, res) => {
  const messageSid = req.body.MessageSid;
  const messageStatus = req.body.MessageStatus;

  if (messageStatus === "delivered") {
    socket.emit("send trackId");
    socket.on("receive trackId", async (trackId) => {
      await Delivery.update(
        {
          smsDelivered: true,
        },
        {
          where: { id: trackId },
        }
      );
    });
    socket.emit("sms delivered", true);
  }

  return res.json({ messageSid, messageStatus });
});

export const setSmsSocket = (sock) => {
  socket = sock;
};
