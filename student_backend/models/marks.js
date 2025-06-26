import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Student } from "./student.js";

export const Mark = sequelize.define("Mark", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Student,
      key: "id",
    },
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['studentId', 'subject'] 
    }
  ]
});


Student.hasMany(Mark, { foreignKey: "studentId" });
Mark.belongsTo(Student, { foreignKey: "studentId" });
