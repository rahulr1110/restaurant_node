const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodCOntroller,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

//route
//create foods
router.post("/create", authMiddleware, createFoodCOntroller);
//get all foods
router.get("/get", getAllFoodsController);
//get single food
router.get("/get/:id", getSingleFoodController);
//get food by restaurant
router.get("/getByrestaurant/:id", getFoodByRestaurantController);
//update foods
router.put("/update/:id", authMiddleware, updateFoodController);
//delete foods
router.delete("/delete/:id", authMiddleware, deleteFoodController);
//place order
router.post("/placeorder", authMiddleware, placeOrderController);
//place order
router.post(
  "/orderstatus/:id",
  authMiddleware,

  orderStatusController
);

module.exports = router;
