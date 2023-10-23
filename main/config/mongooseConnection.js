"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Using environment variables
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const mongooseConnect = async () => {
    const connect = mongoose
        .connect(process.env.MONGODB_CONNECTION_URI)
        .then((res) => {
        console.clear();
        console.log(`Connected to the mongodb!!..`);
    })
        .catch((err) => console.log(err));
    return connect;
};
exports.default = mongooseConnect;
