"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdProductService = exports.getEvenProductHandler = void 0;
const productModel_1 = require("../models/productModel");
const getEvenProductHandler = (msg) => {
    const eventProduct = JSON.parse(msg.content.toString());
    return eventProduct;
};
exports.getEvenProductHandler = getEvenProductHandler;
const createdProductService = async (eventProduct) => {
    try {
        const product = new productModel_1.default({
            adminId: eventProduct.id,
            title: eventProduct.title,
            image: eventProduct.image,
            likes: eventProduct.likes,
        });
        await product.save();
        return product;
    }
    catch (error) {
        return error.message;
    }
};
exports.createdProductService = createdProductService;
