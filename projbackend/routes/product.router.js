const express = require("express");
const {
  createProduct,
  uploadImage,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");
const { validateToken } = require("../controller/user.controller");
const router = express.Router();

router.post("/create", validateToken, createProduct);
router.post("/getproduct", validateToken, getProduct);
router.get("/getallproduct", getAllProduct);
router.put("/updateproduct", validateToken, updateProduct);
router.delete("/delete", validateToken, deleteProduct);
router.post("/image", uploadImage);

module.exports = router;