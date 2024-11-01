const mongoose = require("mongoose");
const Movie = require("./movie.model")
const Producer = require("./producer.model")
const Star = require("./star.model")
const Director = require("./director.model")

//Khoi tao doi tuong CSDL
const db = {};
db.Movie = Movie;
db.Producer = Producer;
db.Star = Star;
db.Director = Director;

db.connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Connect to MongoDB successfully!"))
      .catch((err) => console.error(err));
  } catch (error) {
    next(error);
    process.exit();
  }
};

module.exports = db;
