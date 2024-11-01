const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: [true, "The movie title is required"]
    },
    release: Date,
    description: String,
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "producer",
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "director",
    },
    genres: [
      {
        type: String,
        enum: ["Action", "Drama", "Comedy", "Cartoon"]
      },
    ],
    stars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stars",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
