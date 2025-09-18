import sequelize from "./db.js";
import Sequelize from "sequelize";

import User from "./user.model.js";
import VerificationToken from "./verifcationToken.model.js";
import Activity from "./activity.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.VerificationToken = VerificationToken;
db.Activity = Activity;

// Associations การเชื่อมความสัมพันธ์ระหว่างตาราง

// User กับ VerificationToken
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId" });

db.User.hasMany(db.VerificationToken, { foreignKey: "userId" });

export default db;
