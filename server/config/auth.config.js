import dotenv from "dotenv";
dotenv.config();
const config = {
  secret: process.env.JWT_SECRET || "Nitiphon",
};
export default config;
