const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: [true, "Hotel name is required"],
      minlength: [3, "Hotel name must be at least 3 characters long"],
      maxlength: [100, "Hotel name must be at most 100 characters long"],
      trim: true, // Removes whitespace from both ends of a string
    },
    hotelAddress: {
      type: String,
      required: [true, "Hotel address is required"],
      minlength: [10, "Hotel address must be at least 10 characters long"],
      maxlength: [200, "Hotel address must be at most 200 characters long"],
      trim: true, // Removes whitespace from both ends of a string
    },
    hotelPhone: {
      type: Number,
      required: [true, "Hotel phone number is required"],
      validate: {
        validator: function (v) {
          return /^\d{10,15}$/.test(v.toString());
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Phone number must be between 10 and 15 digits`,
      },
    },
    hotelStandard: {
      type: Number,
      required: [true, "Hotel standard is required"],
      min: [1, "Hotel standard must be at least 1"],
      max: [5, "Hotel standard must be at most 5"],
    },
    hotelCity: {
      type: String,
      required: [true, "Hotel city is required"],
      minlength: [2, "Hotel city must be at least 2 characters long"],
      maxlength: [100, "Hotel city must be at most 100 characters long"],
      trim: true, // Removes whitespace from both ends of a string
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
