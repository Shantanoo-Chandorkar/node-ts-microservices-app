import { Request, Response, NextFunction } from "express";
import connectDB from "../../config/ormconfig";
import { Product } from "../entity/productEntity";

export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productRepository = connectDB.getRepository(Product);

    const products = await productRepository.find();

    if (!products) {
      return res.status(400).json({
        status: "failed",
        message: "Failed to fetch all the products.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productRepository = connectDB.getRepository(Product);

    const { title, image } = req.body;

    if (!title || !image) {
      return res.status(400).json({
        status: "failed",
        message: "Fill in all the data.",
      });
    }

    // Check whether product exists
    const productExists = await productRepository.findOne({
      where: { title: title },
    });

    if (productExists) {
      return res.status(400).json({
        status: "failed",
        message: "Product with same title exists.",
      });
    }

    await productRepository.insert({
      title: title,
      image: image,
    });

    res.status(201).json({
      status: "success",
      message: "New product added successfully.",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

export const GetSingleProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productRepository = connectDB.getRepository(Product);

    const { id } = req.params;

    const product = await productRepository.findOneBy({ id: id });

    if (!product) {
      return res.status(400).json({
        status: "failed",
        message: "Failed to find requested product.",
      });
    }

    res.status(200).json({ status: "success", data: { product } });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

export const UpdateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productRepository = connectDB.getRepository(Product);

    const { id } = req.params;

    const product = await productRepository.findOneBy({ id: id });
    if (!product) {
      return res.status(400).json({
        status: "failed",
        message: "Product with provided id does not exist.",
      });
    }

    productRepository.merge(product, req.body);

    await productRepository.save(product);

    res
      .status(200)
      .json({ status: "success", message: "Product updated successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

export const DeleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productRepository = connectDB.getRepository(Product);

    const { id } = req.params;

    const product = await productRepository.findOneBy({ id: id });
    if (!product) {
      return res.status(400).json({
        status: "failed",
        message: "Product with provided id does not exist.",
      });
    }

    const productDeleted = await productRepository.delete(id);
    if (productDeleted) {
      return res
        .status(200)
        .json({ status: "success", message: "Product deleted successfully." });
    }

    res.status(400).json({
      status: "failed",
      message: "Something went wrong with product deletion.",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

export const likeProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const productRepository = connectDB.getRepository(Product);
    const product = await productRepository.findOneBy({ id: id });
    if (!product) {
      return res.status(400).json({
        status: "failed",
        message: "Product with provided id does not exist.",
      });
    }

    product.likes++;
    await productRepository.save(product);

    res.status(200).json({
      status: "success",
      message: "Product likes updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

export const dislikeProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const productRepository = connectDB.getRepository(Product);
    const product = await productRepository.findOneBy({ id: id });
    if (!product) {
      return res.status(400).json({
        status: "failed",
        message: "Product with provided id does not exist.",
      });
    }

    product.likes--;
    await productRepository.save(product);

    res.status(200).json({
      status: "success",
      message: "Product likes updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};
