import { DataTypes } from "sequelize";
import User from "./user.model.js";
import sequelize from "./db.js";

const VerificationToken = sequelize.define("VerificationToken", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
export default VerificationToken;
