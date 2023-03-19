import { Router } from "express";

export const emailRouter = Router();

/**
 * Works with webhooks to be informed when an email is delievered and failed to be sent
 * As such, it can inform the user via the UI the current status of the email
 */
emailRouter.post("/events", async (req, res) => {
  const body = req.body;
  const eventReceived = body[0].event;

  /**
   * TODO: Once all the logic related to form submission is implemented, we will
   *    have a notification sent to the user in the UI indicating that an email have been
   *    delivered
   * */
  if (eventReceived === "dropped") {
    console.log("failed email!!");
  } else if (eventReceived === "bounced") {
    console.log("bounced email!!");
  } else if (eventReceived === "delivered") {
    console.log("delivered email!!");
  }

  console.log("Event Received: ", eventReceived);
  return res.json({ eventReceived, message: "Email was delivered!" });
});
