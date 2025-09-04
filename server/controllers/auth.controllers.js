import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import bcrypt from "bcryptjs"; //ใช้ในการเข้ารหัสรหัสผ่าน
import jwt from "jsonwebtoken"; //ใช้ในการแลกเปลี่ยนข้อมูลระหว่างเซิร์ฟเวอร์และไคลเอนต์
import config from "../config/auth.config.js"; //ใช้ในการเก็บค่าคอนฟิกต่างๆ เช่น secret key สำหรับ JWT
import { Op } from "sequelize"; //ใช้ในการจัดการกับการค้นหาข้อมูลในฐานข้อมูล

const authController = {};

authController.signup = async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    res
      .status(400)
      .send({ message: "Username, Name, Email or Password can not be empty!" });
    return;
  }
  try {
    const existUser = await User.findOne({ where: { username } });
    if (existUser) {
      res.status(400).send({ message: "Username already exists!" });
      return;
    }
    const newUser = {
      username,
      name,
      email,
      password: bcrypt.hashSync(password, 8), // เข้ารหัสรหัสผ่านด้วย bcrypt
    };
    const user = await User.create(newUser);
    if (req.body.roles && req.body.roles.length > 0) {
      const roles = await Role.findAll({
        where: {
          name: { [Op.or]: req.body.roles },
        },
      });
      if (roles.length === 0) {
        res.status(400).send({ message: "Role not found!" });
        return;
      }
      await user.setRoles(roles);
      res.send({ message: "User was registered successfully!" });
    } else {
      // กำหนด role default เป็น id 3 (admin) หรือเปลี่ยนเป็น id 1 (user) ตามระบบจริง
      await user.setRoles([1]);
      res.send({ message: "User was registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error while create the user",
    });
  }
};

authController.sigIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ message: "Username or Password ห้ามมีตัวใดว่าง" });
    return;
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(404).send({ message: "Username not found!" });
      return;
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      res.status(401).send({ message: "Invalid Password!" });
      return;
    }
    //validate user
    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.secret,
      {
        expiresIn: 86400,
      }
    ); //หมดอายุภายใน 24 ชม.

    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }
    res.send({
      token: token,
      authorities: authorities,
      userInFo: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error while sign in the user",
    });
  }
};
export default authController;
