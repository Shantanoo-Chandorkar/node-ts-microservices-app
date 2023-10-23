"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import modules
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const ormconfig_1 = require("../config/ormconfig");
// Import routing modules
const productRoute_1 = require("./routes/productRoute");
// Express object
const app = express();
// Port
const port = process.env.ADMIN_PORT || 8080;
// Middlewares
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5137"],
}));
app.use(express.json());
// Database
ormconfig_1.default
    .initialize()
    .then(() => {
    console.log(`Data Source has been initialized`);
    console.log(`Rabbit mq connected`);
    // Routing middlewares
    app.use("/api/v1/products", productRoute_1.default);
    // Healthcheck
    app.get("/", (req, res) => {
        res.status(200).json({
            message: "Everything is working A-Okay.",
        });
    });
    // Listen to server
    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
})
    .catch((err) => {
    console.error(`Data Source initialization error`, err);
});
