import { Sequelize } from "sequelize-typescript";
import config from "../config/database.json";

export default new Sequelize({
  database: config.development.database,
  username: config.development.username,
  password: config.development.password,
  host: config.development.host,

  models: [__dirname + "/**/*.model.ts"],

  dialect: "postgres",
  protocol: "postgres",
});
