import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("deliverats", "ratmin", "cheese", {
  host: "localhost",
  dialect: "postgres",
});
