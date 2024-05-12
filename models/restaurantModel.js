const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  title:{
    type:String,
    require : [true, 'restaurant title is required']
  },
  imageurl:{
    type: String,
  },
  foods : {type: Array},
  time : {
    type: String
  },
  pickup:{
    type: Boolean,
    default:true
  },
  delivery:{
    type:Boolean,
    default:true
  },
  isOpen : {
    type: Boolean,
    default : true
  },
  logoUrl :{
    type: String
  },
  rating :{
    type: Number,
    default :1,
    min:1,
    max:5
  },
  ratingCount : {
    type : String
  },
  code :{
    type : String
  },
  coords : {
    id: {type: String},
    latitude : {type: String},
    latitudeDelta : {type : String},
    longitude :{type : Number},
    longitudeDelate : {type: Number},
    address: {type : String},
    title : {type: String}
  }
}, { timeStamp: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);
