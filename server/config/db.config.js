import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  PORT: process.env.DBPORT,
  DIALECT: process.env.DIALECT,
  SSL: process.env.DB_SSL,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;
