import { Router } from "express";
import {
  DeleteProductController,
  GetSingleProductController,
  UpdateProductController,
  createProductController,
  dislikeProductController,
  getAllProductsController,
  likeProductController,
} from "../controllers/productController";

// Router object
const router = Router();

// Routes
/* Public Routes */
router.route("/").get(getAllProductsController).post(createProductController);
router
  .route("/:id")
  .get(GetSingleProductController)
  .put(UpdateProductController)
  .delete(DeleteProductController);

/* Authentication Middleware */

/* Private Routes */
router.put("/:id/like", likeProductController);
router.put("/:id/dislike", dislikeProductController);

export default router;
