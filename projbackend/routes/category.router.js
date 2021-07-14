const express = require("express");
const {
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const { validateToken } = require("../controller/user.controller");

const router = express.Router();

// router.get("/get",);
router.post("/create", validateToken, createCategory);
router.post("/getcategory", validateToken, getCategory);
router.get("/getallcategory", getAllCategory);
router.put("/updatecategory", validateToken, updateCategory);
router.delete("/delete", validateToken, deleteCategory);

module.exports = router;