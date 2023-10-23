import { Schema, model, connect } from "mongoose";

export interface IProduct {
  adminId: string;
  title: string;
  image: string;
  likes: number;
}

const productSchema = new Schema<IProduct>({
  adminId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

const Product = model<IProduct>("Product", productSchema);
export default Product;
