const mongoose = require("mongoose");

//function fro db connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db");
  } catch (error) {
    console.log(`db error`, error);
  }
};

module.exports = connectDB
