import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const FONTEND = process.env.FONT_END_ENV;
// import activityRouter from "./routers/activity.router.js";
// import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.router.js";
import cors from "cors";

app.use(
  cors({
    origin: [FONTEND, "http://localhost:5173", "127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Restaurant Restful API hbrhb");
});
// app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/activity", activityRouter);
app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});

import db from "./models/index.js";
const role = db.Role;

const initRole = () => {
  role.create({ id: 1, name: "admin" });
  role.create({ id: 2, name: "manager" });
  role.create({ id: 3, name: "teacher" });
  role.create({ id: 4, name: "judge" });
};

db.sequelize.sync({ force: false }).then(() => {
  initRole();
  console.log("Drop Sync");
});
