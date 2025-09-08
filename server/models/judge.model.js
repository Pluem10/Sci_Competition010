import { DataTypes } from "sequelize";
import User from "./user.model";

const Judge = User.init(
  {},
  {
    scopes: {
      defaultScope: {
        where: {
          type: "judge",
        },
      },
    },
    hooks: {
      beforeCreate: (judge) => {
        judge.type = "judge";
      },
    },
  }
);

export default Judge;
