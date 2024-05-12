const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  restPasswordController,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//routes
//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

//update profile
router.put("/updateUser", authMiddleware, updateUserController);

//password update route
router.post("/updatePassword", authMiddleware, updatePasswordController);

//reset password
router.post("/resetPassword", authMiddleware, restPasswordController);

//delete user
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController)

module.exports = router;
