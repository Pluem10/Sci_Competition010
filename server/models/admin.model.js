import User from "./user.model.js";
import { DataTypes } from "sequelize";

const Admin = User.init(
  {},
  {
    scopes: {
      defaultScope: {
        where: {
          type: "admin",
        },
      },
    },
    hooks: {
      beforeCreate: (admin) => {
        admin.type = "admin";
      },
    },
  }
);

export default Admin;
