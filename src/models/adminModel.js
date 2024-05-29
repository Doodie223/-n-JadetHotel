const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    adName: {
      type: String,
      required: [true, "Admin name is required"],
      minlength: [6, "Admin name must be at least 6 characters long"],
      maxlength: [30, "Admin name must be at most 30 characters long"],
      trim: true, // Removes whitespace from both ends of a string
    },
    adPassword: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      trim: true, // Removes whitespace from both ends of a string
    },
    adEmail: {
      type: String,
      required: [true, "Email is required"],
      minlength: [6, "Email must be at least 6 characters long"],
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
      unique: true,
      trim: true, // Removes whitespace from both ends of a string
    },
    adPhone: {
      type: Number,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          return /^\d{10,15}$/.test(v.toString());
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Phone number must be between 10 and 15 digits`,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
