"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// Using environment variables
const dotenv = require("dotenv");
dotenv.config();
const connectDB = new typeorm_1.DataSource({
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
exports.default = connectDB;
