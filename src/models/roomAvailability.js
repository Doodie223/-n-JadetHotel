const mongoose = require("mongoose");

const roomAvailabilitySchema = new mongoose.Schema({
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  is_available: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("RoomAvailability", roomAvailabilitySchema);
