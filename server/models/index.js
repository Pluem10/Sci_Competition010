import sequelize from "./db.js";
import Sequelize from "sequelize";
import User from "./user.models.js";
import Judge from "./judge.model.js";
import Teacher from "./teacher.model.js";
import Admin from "./admin.model.js";
import VerificationToken from "./verifcationToken.model.js";
import Activity from "./activity.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Judge = Judge;
db.Teacher = Teacher;
db.Admin = Admin;
db.VerificationToken = VerificationToken;
db.Activity = Activity;

// Associations การเชื่อมความสัมพันธ์ระหว่างตาราง

// User กับ VerificationToken
db.VerificationToken.belongTo(db.User, { foreignKey: "userId" });

db.User.belongTo(db.VerificationToken, { foreignKey: "userId" });

export default db;
