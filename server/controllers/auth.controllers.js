import db from "../models/index.js";
import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import crypto from "crypto";

const User = db.User;

// Register
const signUp = async (req, res) => {
  const { name, email, password, type, school, phone } = req.body;
  try {
    // ตรวจสอบข้อมูลที่รับมาว่าครบถ้วนหรือไม่
    if (!email || !password || !name || !type) {
      return res
        .status(400)
        .send({ message: "กรอกข้อมูลให้ครบถ้วน น้ะครับ/ค่ะ" });
    }
    const allowedTypes = ["admin", "teacher", "judge"];
    // ตรวจสอบว่าประเภทผู้ใช้ถูกต้องหรือไม่
    if (!allowedTypes.includes(type)) {
      return res.status(400).send({
        message: "ประเภทผู้ใช้ไม่ถูกต้อง(Type Admin Teacher of Judge)",
      });
    }
    //ถ้า type teacher ไม่ส่งค่าอะไรมาให้
    if (type === "teacher" && (!school || !phone)) {
      return res.status(400).send({
        message: "กรุณากรอกข้อมูล school และ phone สำหรับครูผู้สอน",
      });
    }

    //เช็คว่ามี email นี้มีในระบบหรือไม่
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).send({ message: "อีเมลนี้มีในระบบแล้ว" });
    }
    // userData object คือข้อมูลที่จะใช้สร้างผู้ใช้ใหม่
    const userData = { name, email, password, type };
    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }
    // สร้างผู้ใช้ใหม่
    const user = await User.create(userData);

    // ส่งข้อมูลผู้ใช้ที่สร้างใหม่กลับไป
    if (type === "teacher") {
      try {
        // สร้างโทเค็นการยืนยันตัวตน
        const token = crypto.randomBytes(32).toString("hex");
        await db.VerificationToken.create({
          token: token,
          userId: user.id,
          expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 วัน
          isVerified: false,
        });
      } catch (error) {}
    }
    return res.status(201).send({
      message:
        user.type === "teacher"
          ? "สมัครสมาชิกสำเร็จ เช็คEmailด้วย"
          : "User registered successfully ",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isVerified: user.isVerified }),
      },
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "เกิดข้อผิดพลาดในการลงทะเบียน" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  if (!token) {
    return res.status(400).send({ message: "Token is missing ! " });
  }
  try {
    const verificationToken = await db.VerificationToken.findOne({
      where: { token: token },
    });
    if (!verificationToken) {
      return res
        .status(404)
        .send({ message: "โทเคนไม่วาลิสส invalid verification" });
    }
    // ตรวจสอบว่าโทเคนหมดอายุหรือไม่
    if (new Date() > verificationToken.expiredAt) {
      await db.VerificationToken.detroy();
      return res.status(400).send({ message: "โทเคนหมดอายุเเล้ว expired" });
    }
    const user = await User.findByPk(verificationToken.userId);
    if (!user) {
      return res.status(404).send({ message: "ไม่พบผู้ใช้ user not found" });
    }
    await user.update({ isVerified: true });
    await db.VerificationToken.destroy();
    //return wed view
    const htmlPath = path.join(process.cwd(), "views", "email-verified.html");
    res.sendFile(htmlPath);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while verifying the user",
    });
  }
};

const authControllers = {
  signUp,
  verifyEmail,
};

export default { signUp, verifyEmail };
