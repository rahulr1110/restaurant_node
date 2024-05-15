//create food

const foodModel = require("../models/foodModel");

const createFoodCOntroller = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodtags,
      category,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodtags,
      category,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    await newFood.save();
    res.status(201).send({
      succes: true,
      message: "new food item created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create food api",
      error,
    });
  }
};

//get food
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        succes: false,
        message: "no food item was found",
      });
    }
    res.status(200).send({
      succes: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error in get all foods api",
      error,
    });
  }
};

const getSingleFoodController = async (req, res) => {
  try {
    const foodid = req.params.id;
    console.log("food");
    if (!foodid) {
      return res.status(404).send({
        succes: false,
        message: "no food found with id",
      });
    }
    const food = await foodModel.findById(foodid);
    if (!food) {
      return res.status(404).send({
        succes: false,
        message: "no food found with id",
      });
    }
    res.status(200).send({
      succes: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error on getting single food",
    });
  }
};
//get food by restaurant
const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        succes: false,
        message: "no restaurnt found",
      });
    }
    const restaurant = await foodModel.find({ restaurant: restaurantId });
    if (!restaurant) {
      return res.status(404).send({
        succes: false,
        message: "no food found with id",
      });
    }
    res.status(200).send({
      succes: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error on getting single food",
    });
  }
};

//update food items
const updateFoodController = async (req, res) => {
  try {
    const foodid = req.params.id;
    if (!foodid) {
      return res.status(404).send({
        succes: false,
        message: "no food id was found",
      });
    }
    const food = await foodModel.findById(foodid);
    if (!food) {
      return res.status(404).send({
        succes: false,
        message: "no food  was found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodtags,
      category,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    const updateFood = await foodModel.findByIdAndUpdate(
      foodid,
      {
        title,
        description,
        price,
        imageUrl,
        foodtags,
        category,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "food items was updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "errror in update food api",
      error,
    });
  }
};

//delete food items
const deleteFoodController = async (req, res) => {
  try {
    const foodid = req.params.id;
    if (!foodid) {
      return res.status(404).send({
        succes: false,
        message: "no food id was found",
      });
    }
    const food = await foodModel.findById(foodid);
    if (!food) {
      return res.status(404).send({
        succes: false,
        message: "no food  was found",
      });
    }

    const deleteFood = await foodModel.findByIdAndDelete(foodid);
    res.status(200).send({
      success: true,
      message: "food items was deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "errror in update food api",
      error,
    });
  }
};

module.exports = {
  createFoodCOntroller,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
};
