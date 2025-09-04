import jwt from "jsonwebtoken";
import db from "../models/index.js";
import authconfig from "../config/auth.config.js";

const User = db.User;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, authconfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

const IsAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "User not found!" });
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }
    return res.status(401).send({ message: "Require Admin Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const authjwt = { verifyToken, IsAdmin };
export default authjwt;
