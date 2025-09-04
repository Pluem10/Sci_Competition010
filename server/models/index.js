import sequelize from "./db.js";
import Sequelize from "sequelize";

import User from "./user.models.js";
import Role from "./role.models.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Role = Role;

// Associations
// User <-> Role (Many-to-Many)
db.User.belongsToMany(db.Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
db.Role.belongsToMany(db.User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

// หากมี Activity, Restaurant, หรือโมเดลอื่น ๆ ให้เพิ่มความสัมพันธ์ที่นี่ เช่น
// import Activity from "./activity.model.js";
// db.Activity = Activity;
// db.User.hasMany(db.Activity, { foreignKey: "createdBy" });
// db.Activity.belongsTo(db.User, { foreignKey: "createdBy" });

export default db;
