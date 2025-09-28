import express from "express";
const router = express.Router();
import activityController from "../controllers/activity.controller.js";
import AuthMiddleware from "../middleware/authJwt.js";

// Create a new activity สร้างกิจกรรมใหม่
// POST http://localhost:5000/api/v1/activities
router.post("/",[AuthMiddleware.verifyToken, AuthMiddleware.isManager],activityController.createActivity);

// Get all activities เรียกดูกิจกรรมทั้งหมด
// GET http://localhost:5000/api/v1/activities
router.get("/", activityController.getAllActivities);

// Get activity by ID เรียกดูข้อมูลกิจกรรมตาม ID
// GET http://localhost:5000/api/v1/activities/:id
router.get("/:id", activityController.getActivityById);

// Update activity by ID แก้ไขข้อมูลกิจกรรมตาม ID
// PUT http://localhost:5000/api/v1/activities/:id
router.put("/:id",[AuthMiddleware.verifyToken, AuthMiddleware.isManager],activityController.updateActivity);

// Delete activity by ID ลบข้อมูลกิจกรรมตาม ID
// DELETE http://localhost:5000/api/v1/activities/:id
router.delete("/:id",[AuthMiddleware.verifyToken, AuthMiddleware.isManager],activityController.deleteActivity);

// Search activities ค้นหากิจกรรม
// GET http://localhost:5000/api/v1/activities/search?name=activityName&type=type&level=level
router.get("/search", activityController.searchActivities);

export default router;
