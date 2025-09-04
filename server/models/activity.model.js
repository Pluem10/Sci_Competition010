import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Activity = sequelize.define("activity", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reg_open: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reg_close: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  contact_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_email: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "please enter a valid email address",
    ],
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //   status: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
});

export default Activity;
