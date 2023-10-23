"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const port = process.env.HOME_PORT || 8000;
const app = express();
// Middlewares
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5137"],
}));
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Connected to home route!" });
});
// Listen to server
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
