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

  await sgMail.send(msg);
};
