const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authorizationMiddleware } = require("../middlewares/middleware");

router.get("/", productController.getProducts);
router.post("/", productController.createProduct);

router.put("/:id", authorizationMiddleware, productController.updateProduct);
router.delete("/:id", authorizationMiddleware, productController.deleteProduct);

module.exports = router;
