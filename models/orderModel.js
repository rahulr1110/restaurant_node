const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepared", "on the way", "deliverd"],
      default: "preparing",
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("order", orderSchema);
