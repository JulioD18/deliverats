import { Delivery } from "../models/deliveries.js";
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

export const deliveriesRouter = Router();
let socket;

deliveriesRouter.post("/", async function (req, res, next) {
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

  const content = `
    Name : ${name} \n
    Last Name : ${lastName} \n
    Email : ${email} \n
    Phone : ${phone} \n
    Address : ${address} \n
    Suite : ${suite} \n
    Items : ${items} \n
    Total : ${total} \n
    Status : Your order was successfully placed!
  `;
  const subject = `Placed Order #${delivery.id}`;

  await sendEmail({ email, subject, content });
  await sendSms({ to: phone, body: content });

  return res.json(delivery);
});

deliveriesRouter.get("/", checkJwt, async function (req, res, next) {
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

deliveriesRouter.get("/:id", async (req, res) => {
  // Retrieve parameters
  const deliveryId = req.params.id;

  // Check that delivery exists
  const delivery = await Delivery.findByPk(deliveryId);
  if (!delivery) return notFoundError(res, "delivery", deliveryId);

  res.json(delivery);
});

deliveriesRouter.patch("/:id", checkJwt, async function (req, res, next) {
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

  socket.emit("delivery status", {
    deliveryId: delivery.id,
    status: delivery.status,
  });

  return res.json(delivery);
});

deliveriesRouter.delete("/:id", checkJwt, async function (req, res, next) {
  // Retrieve data
  const deliveryId = req.params.id;

  // Check that delivery exists
  const delivery = await Delivery.findByPk(deliveryId);
  if (!delivery) return notFoundError(res, "delivery", deliveryId);

  // Check that user owns delivery
  const owner = req.auth.sub;
  if (delivery.owner !== owner) {
    return apiError(res, 403, "The user does not own this delivery");
  }

  // Delete delivery
  await delivery.destroy();

  return res.json(delivery);
});

export const setDeliverySocket = (sock) => {
  socket = sock;
};
