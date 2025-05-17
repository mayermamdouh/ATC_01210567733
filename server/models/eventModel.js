const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  photo: {
    type: String,
    required: [true, "Photo is required for the event"],
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"],
  },
});

module.exports = mongoose.model("Event", EventSchema);
