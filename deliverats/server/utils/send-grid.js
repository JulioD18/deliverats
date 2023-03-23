import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

import sgMail from "@sendgrid/mail";

export const sendEmail = async ({ email, subject, content }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: "deliverats.canada@gmail.com",
    subject: subject,
    text: content,
  };

  const mail = await sgMail.send(msg);

  if (mail.statusCode === 202) {
    return res.json({ message: "Email confirmation successfully" });
  }
};
