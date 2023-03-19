import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const sendSms = async ({ to, body }) => {
  return await client.messages.create({
    body: body,
    from: "+15075545152",
    statusCallback: process.env.TWILIO_CALLBACK_URL,
    to: to,
  });
};
