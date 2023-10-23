import { DataSource } from "typeorm";

// Using environment variables
import * as dotenv from "dotenv";
dotenv.config();

const connectDB = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ["src/entity/*.js"],
  synchronize: true,
  logging: false,
});

export default connectDB;
