import { Form } from "../models/forms.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  apiError,
  findMissingParams,
  missingParamsError,
} from "../utils/api-errors.js";
import { validateForm } from "../utils/validators.js";

export const formsRouter = Router();

formsRouter.post("/", isAuthenticated, async function (req, res, next) {
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
  });

  return res.json(form);
});

formsRouter.get("/", isAuthenticated, async function (req, res, next) {
  // Retrieve parameters
  const offset = req.query.offset ?? 0;
  const limit = req.query.limit ?? 12;
  const userId = req.query.userId ?? undefined;

  // Make query
  const forms = await Form.findAll({
    order: [["id", "DESC"]],
    offset,
    limit,
  });

  // Count forms
  const subQuery = userId ? { UserId: userId } : {};
  const count = (await Form.findAll({ where: subQuery })).length;

  return res.json({ forms, count });
});

formsRouter.get("/:id", isAuthenticated, async (req, res) => {
  // Retrieve parameters
  const formId = req.params.id;

  // Check that form exists
  const form = await Form.findByPk(formId);
  if (!form) return notFoundError(res, "form", formId);

  res.json(form);
});

formsRouter.delete("/:id", isAuthenticated, async function (req, res, next) {
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
