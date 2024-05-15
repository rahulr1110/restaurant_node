const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
  {
    title :{
      type : String,
      require : [true,"food title is required"]
    },
    description : {
     type: String,
     require : [true, "food description is require"]
    },
    price:{
      type: Number,
      require : [true, "food price is require"]
    },
    imageUrl :{
      type : String,
      default :"https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png" 
    },
    foodtags : {
      type : String,
    },
    category : {
      type : String
    },
    code : {
      type : String
    },
    isAvailable : {
      type: String,
      default : true
    },
    restaurant : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Restaurant"
    },
    rating : {
      type: Number,
      default : 5,
      min : 1,
      max : 5
    },
    ratingCount :{
      type : String
    }
  },
  { timeStamp: true }
);

module.exports = mongoose.model("food", foodSchema);
