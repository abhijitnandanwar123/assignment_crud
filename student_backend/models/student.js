import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "Email must be unique" },
    validate: {
      isEmail: { msg: "Invalid email format" },
    },
  },

  age: {
    type: DataTypes.INTEGER,
  },
});
