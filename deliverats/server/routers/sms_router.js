import { Router } from "express";

export const smsRouter = Router();

/**
 * Works with webhooks to be informed whem a message is send, delievered and undeliered
 * As such, it can inform the user via the UI the current status of the message
 */
smsRouter.post("/events", async(req, res) => {
  const messageSid = req.body.MessageSid;
  const messageStatus = req.body.MessageStatus;

  console.log(`SID: ${messageSid}, Status: ${messageStatus}`);

  /**
   * TODO: Once all the logic related to form submission is implemented, we will
   *    have a notification sent to the user in the UI indicating that a text have been
   *    delivered
   * */
  if (messageStatus === "failed") {
    console.log("failed message!!")
  } else if(messageStatus === "undelivered") {
    console.log("undelivered message!!")
  } else if (messageStatus === "sent") {
    console.log("sent message!!")
  } else if (messageStatus === "delivered") {
    console.log("delivered message!!")
  }

  return res.json({ messageSid, messageStatus });
})

