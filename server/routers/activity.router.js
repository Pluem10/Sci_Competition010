import express from "express";
const router = express.Router();
import activityController from "../controllers/activity.controller.js";
import AuthMiddleware from "../middleware/authJwt.js";

// Create a new activity สร้างกิจกรรมใหม่
router.post("/",[AuthMiddleware.verifyToken, AuthMiddleware.isManager],activityController.createActivity);

// Get all activities เรียกดูกิจกรรมทั้งหมด
router.get("/", activityController.getAllActivities);

// Get activity by ID เรียกดูข้อมูลกิจกรรมตาม ID
router.get("/:id", activityController.getActivityById);

// Update activity by ID แก้ไขข้อมูลกิจกรรมตาม ID
router.put("/:id",[AuthMiddleware.verifyToken, AuthMiddleware.isManager],activityController.updateActivity);

// Delete activity by ID ลบข้อมูลกิจกรรมตาม ID
router.delete("/:id",[AuthMiddleware.verifyToken, AuthMiddleware.isManager],activityController.deleteActivity);

// Search activities ค้นหากิจกรรม
router.get("/search", activityController.searchActivities);

export default router;
