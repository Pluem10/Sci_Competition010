import express from "express";
const router = express.Router();
import activityControllers from "../controllers/activity.controllers.js";

// POST http://localhost:5000/api/v1/activity
router.post("/", activityControllers.create);

// GET all activities
router.get("/", activityControllers.getAll);

// GET activity by id
router.get("/:id", activityControllers.getById);

// PUT update activity
router.put("/:id", activityControllers.update);

// DELETE activity
router.delete("/:id", activityControllers.delete);

export default router;
