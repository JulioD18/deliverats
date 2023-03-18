import { Router } from "express";

export const emailRouter = Router();

emailRouter.post("/events", async function (req, res) {
  const body = req.body;
  const eventReceived = body[0].event;

  console.log("Event Received: ", eventReceived)
  return res.json({ eventReceived, message: "Email was delivered!"})
})