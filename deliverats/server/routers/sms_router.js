import { Router } from "express";
import { Delivery } from "../models/deliveries.js";

export const smsRouter = (io) => {
  const router = Router();
  /**
   * Works with webhooks to be informed whem a message is send, delievered and undeliered
   * As such, it can inform the user via the UI the current status of the message
   *
   * It's just configured for successful sms delivered
   */
  router.post("/events", async (req, res) => {
    const messageSid = req.body.MessageSid;
    const messageStatus = req.body.MessageStatus;

    io.emit("send trackId", "sms");
    io.emit("sms delivered");

    console.log("SMS event received: ", messageStatus);
    return res.json({ messageSid, messageStatus });
  });
  return router;
};
