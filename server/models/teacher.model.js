import { DataTypes } from "sequelize";
import User from "./user.model";
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
    scopes: {
      defaultScope: {
        where: {
          type: "teacher",
        },
      },
    },
  },
  {
    hook: {
      beforeCreate: (teacher) => {
        teacher.type = "teacher";
      },
    },
  }
);

export default Teacher;
