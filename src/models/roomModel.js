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
    number: {
      type: Number,
      required: [true, "Number is required"],
      min: [0, "Number must be a positive number"],
    },
    acreage: {
      type: Number,
      required: [true, "Acreage is required"],
      min: [0, "Acreage must be a positive number"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [2000, "Description must be at most 500 characters long"],
      trim: true, // Removes whitespace from both ends of the string
    },
    roomImages: {
      type: [String], // Array of strings to store multiple image paths
      required: [true, "At least one room image is required"],
      validate: {
        validator: function (v) {
          return v.length > 0; // Ensure there's at least one image
        },
        message: "At least one room image is required",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
