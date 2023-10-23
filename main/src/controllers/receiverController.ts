// import { Request, Response, NextFunction } from "express";
// import * as amqp from "amqplib/callback_api";
// import Product from "../models/productModel";

// export const productCreatedController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // console.log("Product Created!");
//     res.status(201).json({
//       message: "Product Created.",
//       // data: {
//       //   product,
//       // },
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Something went wrong with product creation message queue.",
//     });
//   }
// };
