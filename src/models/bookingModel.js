const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room", // Assuming there's a Room model
      required: [true, "Room ID is required"],
    },
    start_date: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (v) {
          return v instanceof Date && !isNaN(v.valueOf());
        },
        message: (props) => `${props.value} is not a valid date`,
      },
    },
    end_date: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (v) {
          return v instanceof Date && !isNaN(v.valueOf());
        },
        message: (props) => `${props.value} is not a valid date`,
      },
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
