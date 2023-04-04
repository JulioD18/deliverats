import { Delivery } from "../models/deliveries.js";
import { Form } from "../models/forms.js";
import { Router } from "express";
import {
  apiError,
  findMissingParams,
  missingParamsError,
  notFoundError,
} from "../utils/api-errors.js";
import { validateDelivery } from "../utils/validators.js";
import { checkJwt } from "../middleware/token-validation.js";
import { sendEmail } from "../utils/send-grid.js";
import { sendSms } from "../utils/sms.js";
import { generatePDF } from "../utils/pdf.js";
import fs from "fs";
import { formatPhoneNumber, formatCurrency } from "../utils/formatters.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

export const deliveriesRouter = (io) => {
  const router = Router();

  router.post("/", async function (req, res, next) {
    // Validate parameters
    const missingParams = findMissingParams(req, [
      "name",
      "lastName",
      "email",
      "phone",
      "address",
      "latitude",
      "longitude",
      "items",
      "total",
    ]);
    if (missingParams) return missingParamsError(res, missingParams);

    // Retrieve parameters
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const suite = req.body.suite;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const items = req.body.items;
    const total = req.body.total;
    const owner = req.body.owner;

    // Validate delivery
    const deliveryError = validateDelivery(req.body);
    if (deliveryError) return apiError(res, 400, deliveryError);

    // Create delivery
    const delivery = await Delivery.create({
      name,
      lastName,
      email,
      phone,
      address,
      suite,
      latitude,
      longitude,
      items,
      total,
      owner,
    });

    const form = await Form.findOne({
      where: {
        owner,
      },
      attributes: ["email", "phone"],
    });

    const content = `
      New Order #${delivery.id} \n
      Name : ${name} \n
      Last Name : ${lastName} \n
      Email : ${email} \n
      Phone : ${formatPhoneNumber(phone)} \n
      Address : ${address} \n
      Suite : ${suite} \n
      Items : \n
      ${items
        .map((item) => {
          return (
            `- ${item.quantity}x ${item.name}` +
            (item.options && item.options.length > 0
              ? "(" + item.options.map((option) => option.name).join(", ") + ")"
              : "")
          );
        })
        .join("\n")} \n
      Total : ${formatCurrency(total)} \n
      Status : Your order was successfully placed! \n\n
      You can follow your order status at ${process.env.TRACKING_URL}/track/${
      delivery.id
    }
    `;

    const subject = `Placed Order #${delivery.id}`;

    // Sending information to form owner mail and phone
    if (form.email) await sendEmail({ email: form.email, subject, content });
    if (form.phone) await sendSms({ to: form.phone, body: content });

    // Sending information to user mail and phone
    await sendEmail({ email, subject, content });
    await sendSms({ to: phone, body: content });
    generatePDF({ order: delivery.id, name, lastName, email, items, total });

    return res.json(delivery);
  });

  router.get("/", checkJwt, async function (req, res, next) {
    // Retrieve parameters
    const offset = req.query.offset ?? 0;
    const limit = req.query.limit ?? 12;
    const owner = req.query.owner ?? undefined;

    const query = owner ? { owner } : {};

    // Make query
    const deliveries = await Delivery.findAll({
      order: [["id", "DESC"]],
      where: query,
      offset,
      limit,
    });

    // Count deliveries
    const count = (await Delivery.findAll({ where: query })).length;

    return res.json({ deliveries, count });
  });

  router.get("/:id", async (req, res) => {
    // Retrieve parameters
    const deliveryId = req.params.id;

    // Check that delivery exists
    const delivery = await Delivery.findByPk(deliveryId);
    if (!delivery) return notFoundError(res, "delivery", deliveryId);

    res.json(delivery);
  });

  router.patch("/:id", checkJwt, async function (req, res, next) {
    // Retrieve data
    const deliveryId = req.params.id;

    // Check that delivery exists
    let delivery = await Delivery.findByPk(deliveryId);
    if (!delivery) return notFoundError(res, "delivery", deliveryId);

    // Check that user owns delivery
    const owner = req.auth.sub;
    if (delivery.owner !== owner) {
      return apiError(res, 403, "The user does not own this delivery");
    }

    // Patch delivery
    delivery = await delivery.update(req.body);

    io.emit("delivery status", {
      deliveryId: delivery.id,
      status: delivery.status,
    });

    return res.json(delivery);
  });

  router.get("/receipts/:id", async function (req, res, next) {
    // Retrieve data
    const deliveryId = req.params.id;

    // Check that delivery exists
    let delivery = await Delivery.findByPk(deliveryId);
    if (!delivery) return notFoundError(res, "delivery", deliveryId);

    // Get pdf of delivery
    const filePath = `receipts/receipt#${delivery.id}.pdf`;
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return notFoundError(res, "receipt", delivery.id);
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="receipt#${delivery.id}.pdf"`
      );
      res.send(data);
    });
  });
  return router;
};
