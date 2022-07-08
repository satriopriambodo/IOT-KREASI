const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const {
  authenticationMiddleware,
  authorizationMiddleware,
} = require("../middlewares/middleware");

router.use("/users", userRoute);

router.use(authenticationMiddleware);

router.use("/products", productRoute);

module.exports = router;
