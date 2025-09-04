import express from "express";
const router = express.Router();
import activityControllers from "../controllers/activity.controllers.js";
import Activity from "../models/activity.model";

import { verifyToken, isAdmin, isManager } from "../middleware/authjwt.js";

router.post("/", [verifyToken, isAdmin], activityControllers.create);

// GET all activities
router.get("/", [verifyToken], activityControllers.getAll);

// GET activity by id
router.get("/:id", [verifyToken], activityControllers.getById);

// PUT update activity
router.put("/:id", [verifyToken, isManager], activityControllers.update);

// DELETE activity
router.delete("/:id", [verifyToken, isAdmin], activityControllers.delete);

export default router;
