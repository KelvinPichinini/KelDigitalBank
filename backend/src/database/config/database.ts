import 'dotenv/config'
import { Options } from "sequelize";

const config: Options = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "2609",
  database: process.env.DB_NAME || "KelDigitalBank",
  dialect: 'mysql'
};

module.exports = config