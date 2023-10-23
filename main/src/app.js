"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import modules
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongooseConnection_1 = require("../config/mongooseConnection");
const amqp = require("amqplib/callback_api");
const productModel_1 = require("./models/productModel");
const axios_1 = require("axios");
// Import routing modules
// import receiverRoutes from "./routes/receiverRoutes";
// Express object
const app = express();
// Port
const port = process.env.MAIN_PORT || 8081;
// Middlewares
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5137"],
}));
app.use(express.json());
// Database
(0, mongooseConnection_1.default)()
    .then((db) => {
    console.clear();
    console.log(`Data Source has been initialized`);
    amqp.connect(process.env.AMQP_CONNECTION_URL, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            console.log(`Rabbit mq connected`);
            channel.assertQueue("product_created", { durable: false });
            channel.assertQueue("product_updated", { durable: false });
            channel.assertQueue("product_deleted", { durable: false });
            channel.assertQueue("product_liked", { durable: false });
            channel.assertQueue("product_disliked", { durable: false });
            // Routing middlewares
            // app.use("/api/v1/products", receiverRoutes);
            // Healthcheck
            app.get("/", (req, res) => {
                res.status(200).json({
                    message: "Everything is working A-Okay.",
                });
            });
            channel.consume("product_created", async (msg) => {
                const eventProduct = JSON.parse(msg.content.toString());
                // console.log(eventProduct);
                const product = new productModel_1.default({
                    adminId: eventProduct.id,
                    title: eventProduct.title,
                    image: eventProduct.image,
                    likes: eventProduct.likes,
                });
                await product.save();
                console.log("Product Created!", product);
                return product;
            }, { noAck: true });
            channel.consume("product_updated", async (msg) => {
                const eventProduct = JSON.parse(msg.content.toString());
                const product = await productModel_1.default.findOne({ adminId: eventProduct.id });
                if (!product) {
                    console.log("product not found :(");
                }
                const updatedProduct = await productModel_1.default.findByIdAndUpdate(product._id, {
                    title: eventProduct.title,
                    image: eventProduct.image,
                    likes: eventProduct.likes,
                }, { new: true });
                console.log("Product updated!\n", updatedProduct);
            }, {
                noAck: true,
            });
            channel.consume("product_deleted", async (msg) => {
                try {
                    const eventProduct = JSON.parse(msg.content.toString());
                    const product = await productModel_1.default.findOne({ adminId: eventProduct });
                    if (!product) {
                        console.log("product not found :(");
                    }
                    const deletedProduct = await productModel_1.default.findByIdAndDelete(product._id);
                    console.log("Product deleted!\n", deletedProduct);
                }
                catch (error) {
                    console.log(error.message);
                }
            }, {
                noAck: true,
            });
            channel.consume("product_disliked", async (msg) => {
                try {
                    const eventProduct = JSON.parse(msg.content.toString());
                    console.log(eventProduct);
                    const product = await productModel_1.default.findOne({
                        adminId: eventProduct.id,
                    });
                    if (!product) {
                        console.log("product not found :(");
                    }
                    // const deletedProduct = await Product.findByIdAndDelete(
                    //   product._id
                    // );
                    product.likes = eventProduct.likes;
                    await product.save();
                    console.log("Product disliked!\n", product);
                }
                catch (error) {
                    console.log(error.message);
                }
            }, {
                noAck: true,
            });
            channel.consume("product_disliked", async (msg) => {
                try {
                    const eventProduct = JSON.parse(msg.content.toString());
                    console.log(eventProduct);
                    const product = await productModel_1.default.findOne({
                        adminId: eventProduct.id,
                    });
                    if (!product) {
                        console.log("product not found :(");
                    }
                    // const deletedProduct = await Product.findByIdAndDelete(
                    //   product._id
                    // );
                    product.likes = eventProduct.likes;
                    await product.save();
                    console.log("Product deleted!\n", product);
                }
                catch (error) {
                    console.log(error.message);
                }
            }, {
                noAck: true,
            });
            app.get("/api/v1/products", async (req, res) => {
                try {
                    const products = await productModel_1.default.find({});
                    return res.status(200).json({
                        status: "success",
                        data: {
                            products,
                        },
                    });
                }
                catch (error) {
                    console.log(error.message);
                    return res.status(500).json({
                        status: "failed",
                        message: "Failed to fetch products.",
                    });
                }
            });
            app.put("/api/v1/products/:id/like", async (req, res) => {
                try {
                    const product = await productModel_1.default.findById(req.params.id);
                    await axios_1.default.put(`http://localhost:8080/api/v1/products/${product.adminId}/like`, {});
                    product.likes++;
                    await product.save();
                    return res.status(200).json({
                        status: "success",
                        data: {
                            product,
                        },
                    });
                }
                catch (error) {
                    console.log(error.message);
                    return res.status(500).json({
                        status: "failed",
                        message: "Failed to fetch products.",
                    });
                }
            });
            app.put("/api/v1/products/:id/dislike", async (req, res) => {
                try {
                    const product = await productModel_1.default.findById(req.params.id);
                    await axios_1.default.put(`http://localhost:8080/api/v1/products/${product.adminId}/dislike`, {});
                    product.likes--;
                    await product.save();
                    return res.status(200).json({
                        status: "success",
                        data: {
                            product,
                        },
                    });
                }
                catch (error) {
                    console.log(error.message);
                    return res.status(500).json({
                        status: "failed",
                        message: "Failed to fetch products.",
                    });
                }
            });
            // Listen to server
            app.listen(port, () => {
                console.log(`Server is listening on port: ${port}`);
            });
            process.on("beforeExit", () => {
                console.log("Closing...");
                connection.close();
            });
        });
    });
})
    .catch((err) => {
    console.error(`Data Source initialization error`, err);
});
