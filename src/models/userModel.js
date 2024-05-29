const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      minlength: [6, "User name must be at least 6 characters long"],
      maxlength: [30, "User name must be at most 30 characters long"],
      unique: true,
      trim: true, // Removes whitespace from both ends of a string
    },
    userPassword: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      trim: true, // Removes whitespace from both ends of a string
    },
    userEmail: {
      type: String,
      required: [true, "Email is required"],
      minlength: [6, "Email must be at least 6 characters long"],
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
      unique: true,
      trim: true, // Removes whitespace from both ends of a string
    },
    userPhone: {
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
    userDOB: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
