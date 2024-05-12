const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageurl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide restaurant api",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageurl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "new restaurant created successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create restaurant api",
      error,
    });
  }
};

//get all restaurant
const getAllRestuarantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No resturant available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all restaurant API",
    });
  }
};

//get restaurant by id
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide restaurant id",
      });
    }
    //find resturant
    const resturant = await restaurantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get restaurant by id api",
    });
  }
};
//delete Restaurant
const deleteRestaurantContoller = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "no restaurant or provide restaurant found",
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: "restaurant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete api",
      error,
    });
  }
};
module.exports = {
  createRestaurantController,
  getAllRestuarantController,
  getResturantByIdController,
  deleteRestaurantContoller,
};
