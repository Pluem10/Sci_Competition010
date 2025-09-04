import dotenv from "dotenv";
dotenv.config();

const config = {
  secret: process.env.JWT_SECRET || "default_jwt_secret_key",
  expiresIn: process.env.JWT_EXPIRES_IN || "1d",
};
export default config;
