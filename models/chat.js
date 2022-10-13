const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    min: 1,
  },
  author: {
    type: String,
    required: true,
    min: 1,
  },
  room: {
    type: String,
    min: 1,
    max: 255,
  },
  time: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Chat", chatSchema);
