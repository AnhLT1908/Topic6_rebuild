const mongoose = require("mongoose");

const starSchema = new mongoose.Schema(
  {
    fullname: String,
    male: Boolean,
    dob: Date,
    nationality: String,
  },
  {
    timestamps: true,
  }
);

const Star = mongoose.model("stars", starSchema);

module.exports = Star;
