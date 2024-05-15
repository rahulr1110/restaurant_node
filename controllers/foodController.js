//create food

const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

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

//place order
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        succes: false,
        message: "please add cart and payement methods",
      });
    }
    let total = 0;
    //calculate
    cart.map((i) => {
      total += i.price;
    });
    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      succes: true,
      message: "order places successfully",
      newOrder,
    });
  } catch (error) {
    res.status(500).send({
      succes: false,
      message: "errror in order food api",
      error,
    });
  }
};
//chnage order status
const  orderStatusController =async (req,res)=>{
try {
  const orderId = req.params.id
  if(!orderId)
    {
      return res.status(404).send({
        succes: false,
        message:"please provide valid order id"
      })
    }
  const {status} = req.body
  const order = await orderModel.findByIdAndUpdate(orderId,{status}, {new:true})
  res.status(200).send({
    succes : true,
    message : "order status updated",
    order
  })

} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message :"error inorder status Api",
    error
  })
}
}

module.exports = {
  createFoodCOntroller,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController
};
