const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const { populate } = require("../models/movie.model");

const movieRouter = express.Router();

movieRouter.use(bodyParser.json());

movieRouter.post("/create", async (req, res, next) => {
  try {
    const newMovie = await db.Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
});

movieRouter.get("/list", async (req, res, next) => {
  try {
    const listMovie = await db.Movie.find({})
      .populate("director")
      .populate("producer")
      .populate("stars")
      .exec();

    const listMovieFormated = listMovie?.map((m) => {
      return {
        _id: m._id,
        title: m.title,
        release: m.release,
        description: m.description,
        producer: m.producer?.name,
        director: m.director?.fullname,
        genres: m.genres?.map((genre) => genre),
        stars: m.stars?.map((star) => star.fullname),
      };
    });
    res.status(200).json(listMovieFormated);
  } catch (error) {
    next(error);
  }
});

movieRouter.get("/by-star/:starId", async (req, res, next) => {
  try {
    const starId = req.params.starId;
    const listMovieStar = await db.Movie.find({ stars: starId })
      .populate("director")
      .populate("producer")
      .populate("stars")
      .exec();

    const listMovieFormated = listMovieStar?.map((m) => {
      return {
        _id: m._id,
        title: m.title,
        release: m.release,
        description: m.description,
        producer: m.producer?.name,
        director: m.director?.fullname,
        genres: m.genres?.map((genre) => genre),
        stars: m.stars?.map((star) => star.fullname),
      };
    });
    res.status(200).json(listMovieFormated);
  } catch (error) {
    next(error);
  }
});

movieRouter.get("/count-by-director/:directorName", async (req, res, next) => {
  try {
    const directorName = req.params.directorName;
    console.log("Director name:", directorName);
    const directorData = await db.Director.find({
      fullname: directorName,
    }).exec();
    console.log("Director data:", directorData);
    const directorId = directorData?.map((d) => d._id);
    console.log("Director id:", directorId);
    const findMovieDirector = await db.Movie.find({ director: directorId });
    const countMovie = findMovieDirector.reduce((total, number) => {
      return total + 1;
    }, 0);
    console.log("Movie:", findMovieDirector);
    if (directorData && directorData.length > 0) {
      res.status(200).json({
        director: directorName,
        numberOfMovies: countMovie,
      });
    } else {
      res.status(404).json({
        error: { status: 404, message: "This director name does not exist" },
      });
    }
  } catch (error) {
    next(error);
  }
});

//List all movies produced by a specific producer.
movieRouter.get("/by-producer/:producerId", async (req, res, next) => {
  try {
    const producerId = req.params.producerId;
    const listMovieProducer = await db.Movie.find({ producer: producerId })
      .populate("director")
      .populate("producer")
      .populate("stars")
      .exec();
    const listMovieFormated = listMovieProducer?.map((m) => {
      return {
        _id: m._id,
        title: m.title,
        release: m.release,
        description: m.description,
        producer: m.producer?.name,
        director: m.director?.fullname,
        genres: m.genres?.map((genre) => genre),
        stars: m.stars?.map((star) => star.fullname),
      };
    });
    res.status(200).json(listMovieFormated);
  } catch (error) {
    next(error);
  }
});

movieRouter.get("/title/:title", async (req, res, next) => {
  try {
    const title = req.params.title;
    const movieByTitle = await db.Movie.find({ title: title })
      .populate("director")
      .populate("producer")
      .populate("stars")
      .exec();
    const listMovieFormated = movieByTitle?.map((m) => {
      return {
        _id: m._id,
        title: m.title,
        release: m.release,
        description: m.description,
        producer: m.producer?.name,
        director: m.director?.fullname,
        genres: m.genres?.map((genre) => genre),
        stars: m.stars?.map((star) => star.fullname),
      };
    });
    res.status(200).json(listMovieFormated);
  } catch (error) {
    next(error);
  }
});

movieRouter.get("/released-in/:year", async (req, res, next) => {
  try {
    const year = req.params.year;
    const startYear = new Date(`${year}-01-01`);
    const endYear = new Date(`${year}-12-31`);
    const movieRelease = await db.Movie.find({
      release: { $gte: startYear, $lte: endYear },
    });
    res.status(200).json(movieRelease);
  } catch (error) {
    next(error);
  }
});

module.exports = movieRouter;
