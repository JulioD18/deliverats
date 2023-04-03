import { Router } from "express";

export const emailRouter = (io) => {
  const router = Router();

  /**
   * Works with webhooks to be informed when an email is delivered and failed to be sent
   * As such, it can inform the user via the UI the current status of the email
   *
   * It's just configured for successful email delivered
   */
  router.post("/events", async (req, res) => {
    const body = req.body;
    const eventReceived = body[0].event;

    io.emit("send trackId", "email", body[0].email);

    console.log("Email event received: ", eventReceived);
    return res.json({ eventReceived, message: "Email was delivered!" });
  });

  return router;
};
