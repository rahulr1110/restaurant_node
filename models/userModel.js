const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "user name is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "password required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      require: [true, "phone number is required"],
    },
    usertype: {
      type: String,
      require: [true, "use type is required "],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw1tlIWK8PHo1HiIJ3x9H0gU&ust=1715357549812000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJD2ivz6gIYDFQAAAAAdAAAAABAX",
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("User", userSchema);
