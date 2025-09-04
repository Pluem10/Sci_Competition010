import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "",
  DB: process.env.DB_NAME || "testdb",
  PORT: process.env.DB_PORT || 3306,
  DIALECT: process.env.DB_DIALECT || "mysql",
  SSL: process.env.DB_SSL === "true",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;
