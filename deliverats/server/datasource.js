import { Sequelize } from "sequelize";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

const db = process.env.POSTGRES_DB;
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;

export const sequelize = new Sequelize(db, user, password, {
  host: host,
  dialect: "postgres",
});
