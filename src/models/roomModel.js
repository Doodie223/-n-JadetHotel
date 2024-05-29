const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "Hotel ID is required"],
    },
    roomtype_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType", // Assuming there's a RoomType model
      required: [true, "Room type ID is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
