const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Booking ID is required"],
    },
    amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    paymentDate: {
      type: Date,
      required: [true, "Payment date is required"],
      validate: {
        validator: function (v) {
          return v instanceof Date && !isNaN(v.valueOf());
        },
        message: (props) => `${props.value} is not a valid date`,
      },
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: {
        values: [
          "Credit Card",
          "Debit Card",
          "PayPal",
          "Bank Transfer",
          "Cash",
        ],
        message: "{VALUE} is not a valid payment method",
      },
      trim: true, // Removes whitespace from both ends of the string
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
