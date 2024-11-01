const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const Producer = mongoose.model("producer", producerSchema);

module.exports = Producer;
