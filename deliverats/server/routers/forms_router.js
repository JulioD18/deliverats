import { Form } from "../models/forms.js";
import { Router } from "express";
import {
  apiError,
  findMissingParams,
  missingParamsError,
  notFoundError,
} from "../utils/api-errors.js";
import { validateForm } from "../utils/validators.js";
import { checkJwt } from "../middleware/token-validation.js";
import { sendEmail } from "../utils/send-grid.js";

export const formsRouter = Router();

formsRouter.post("/", checkJwt, async function (req, res, next) {
  // Validate parameters
  const missingParams = findMissingParams(req, [
    "name",
    "description",
    "categories",
    "items",
    "options",
  ]);
  if (missingParams) return missingParamsError(res, missingParams);

  // Retrieve parameters
  const name = req.body.name;
  const description = req.body.description;
  const email = req.body.email;
  const phone = req.body.phone;
  const categories = req.body.categories;
  const items = req.body.items;
  const options = req.body.options;
  const owner = req.auth.sub;

  // Validate form
  const formError = validateForm(req.body);
  if (formError) return apiError(res, 400, formError);

  // Create form
  const form = await Form.create({
    name,
    description,
    email: email !== "" ? email : null,
    phone: phone !== "" ? phone : null,
    items,
    options,
    categories,
    owner,
  });

  return res.json(form);
});

formsRouter.get("/", checkJwt, async function (req, res, next) {
  // Retrieve parameters
  const offset = req.query.offset ?? 0;
  const limit = req.query.limit ?? 12;
  const owner = req.query.owner ?? undefined;

  const query = owner ? { owner } : {};

  // Make query
  const forms = await Form.findAll({
    order: [["id", "DESC"]],
    where: query,
    offset,
    limit,
  });

  // Count forms
  const count = (await Form.findAll({ where: query })).length;

  return res.json({ forms, count });
});

formsRouter.get("/:id", checkJwt, async (req, res) => {
  // Retrieve parameters
  const formId = req.params.id;

  // Check that form exists
  const form = await Form.findByPk(formId);
  if (!form) return notFoundError(res, "form", formId);

  res.json(form);
});

formsRouter.delete("/:id", checkJwt, async function (req, res, next) {
  // Retrieve data
  const formId = req.params.id;

  // Check that form exists
  const form = await Form.findByPk(formId);
  //const form = await Form.findByPk(formId, { include: ["User"] });
  if (!form) return notFoundError(res, "form", formId);

  // Check that user owns form
  // if (form.UserId !== userId) {
  //   return apiError(res, 403, "The user does not own this form");
  // }

  // Delete form
  await form.destroy();

  return res.json(form);
});
