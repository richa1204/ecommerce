const express = require("express");
const router = express.Router();

router.use("/user", require("./user.router"));
router.use("/category", require("./category.router"));
router.use("/product", require("./product.router"));

module.exports = router;