import * as amqp from "amqplib/callback_api";
import Product from "../models/productModel";

export const getEvenProductHandler = (msg: amqp.Message | null) => {
  const eventProduct = JSON.parse(msg.content.toString());
  return eventProduct;
};

export const createdProductService = async (eventProduct) => {
  try {
    const product = new Product({
      adminId: eventProduct.id,
      title: eventProduct.title,
      image: eventProduct.image,
      likes: eventProduct.likes,
    });

    await product.save();
    return product;
  } catch (error) {
    return error.message;
  }
};
