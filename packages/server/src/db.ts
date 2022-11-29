import { Sequelize } from "sequelize-typescript";
import configs from "../config/database.json";

const env = (process.env.NODE_ENV || "development") as keyof typeof configs;
export const config = configs[env];

if (!config) {
  throw new Error("Unknown database environment.");
}

const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  port: config.port,

  models: [__dirname + "/**/*.model.ts"],

  dialect: "postgres",
  protocol: "postgres",
});

export default sequelize;
