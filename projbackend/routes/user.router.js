const express = require("express");
const {
  signup,
  signin,
  signout,
  getUser,
  getAllUser,
  updateUser,
  validateToken,
  deleteUser,
} = require("../controller/user.controller");
const router = express.Router();

// router.get("/get",);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/getuser", validateToken, getUser);
router.get("/getalluser", getAllUser);
router.put("/updateuser", validateToken, updateUser);
router.delete("/delete", validateToken, deleteUser);

module.exports = router;