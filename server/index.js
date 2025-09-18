import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const FONTEND = process.env.FONT_END_ENV;
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_URL = process.env.FRONTEND_URL;

import authRouter from "./routers/auth.router.js";
import cors from "cors";
import activityRouter from "./routers/activity.router.js";
// import authjwt from "./middleware/authjwt.js";

app.use(
  cors({
    origin: [FONTEND, "http://localhost:5173", "127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection established successfully");
    if (NODE_ENV === "development") {
      await db.sequelize.sync({ alter: true });
      console.log("database Synced in development");
    }
  } catch (error) {
    console.error("Unable to connect to datavase", error);
  }
};
initDatabase();

app.get("/", (req, res) => {
  res.send("Restaurant Restful API hbrhb");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/activity", activityRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});

import db from "./models/index.js";
const role = db.Role;

// const initRole = () => {
//   role.create({ id: 1, name: "admin" });
//   role.create({ id: 2, name: "manager" });
//   role.create({ id: 3, name: "teacher" });
//   role.create({ id: 4, name: "judge" });
// };
// initRole();

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop Sync");
});
