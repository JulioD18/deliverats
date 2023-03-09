import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const Form = sequelize.define("Form", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categories: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
