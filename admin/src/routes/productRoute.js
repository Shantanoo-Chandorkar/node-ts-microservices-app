"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
// Router object
const router = (0, express_1.Router)();
// Routes
/* Public Routes */
router.route("/").get(productController_1.getAllProductsController).post(productController_1.createProductController);
router
    .route("/:id")
    .get(productController_1.GetSingleProductController)
    .put(productController_1.UpdateProductController)
    .delete(productController_1.DeleteProductController);
/* Authentication Middleware */
/* Private Routes */
router.put("/:id/like", productController_1.likeProductController);
router.put("/:id/dislike", productController_1.dislikeProductController);
exports.default = router;
