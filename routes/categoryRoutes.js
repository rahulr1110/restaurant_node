const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCatController,
  getAllCatController,
  updateCatCategory,
  deleteCatCategory,
} = require("../controllers/categoryController");

const router = express.Router();

//route
//create category
router.post("/create", authMiddleware, createCatController);
//get all category
router.get("/getAll", authMiddleware, getAllCatController);
//update category
router.put("/update/:id", authMiddleware, updateCatCategory);
//delete category
router.delete("/delete/:id", authMiddleware, deleteCatCategory);

module.exports = router;
