import { DataTypes } from "sequelize";
import User from "./user.model.js";
import sequelize from "./db.js";
// init model Teacher โดยสืบทอดมาจาก User
const Teacher = User.init(
  {
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    scopes: {
      defaultScope: {
        where: {
          type: "teacher",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: (teacher) => {
        teacher.type = "teacher";
      },
    },
  }
);

export default Teacher;
