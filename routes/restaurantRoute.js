const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createRestaurantController,
  getAllRestuarantController,
  getResturantByIdController,
  deleteRestaurantContoller,
} = require("../controllers/restaurantController");

const router = express.Router();

//route
//create restaurant || post
router.post("/create", authMiddleware, createRestaurantController);

//get all restaurabt || get
router.get("/getAll", getAllRestuarantController);

//get  restaurant by id || get
router.get("/get/:id", getResturantByIdController);

//delete resturant  || delete
router.delete("/delete/:id", authMiddleware, deleteRestaurantContoller);

module.exports = router;
