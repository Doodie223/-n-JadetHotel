const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Room type is required"],
      minlength: [3, "Room type must be at least 3 characters long"],
      maxlength: [50, "Room type must be at most 50 characters long"],
      trim: true, // Removes whitespace from both ends of the string
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [500, "Description must be at most 500 characters long"],
      trim: true, // Removes whitespace from both ends of the string
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoomType", roomTypeSchema);
