const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  tickets: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
