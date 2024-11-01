const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");

const directorRouter = express.Router();

directorRouter.use(bodyParser.json());

//Retrieve details of a specific director by their ID

directorRouter.get("/:directorId", async (req, res, next) => {
  try {
    const directorId = req.params.directorId;
    const movieByDirector = await db.Movie.find({
      director: directorId,
    }).exec();
    const directorData = await db.Director.find({ _id: directorId }).exec();
    console.log("Director:", directorData);
    const directorDataFormat = directorData?.map((d) => {
      return {
        fullname: d.fullname,
        dob: d.dob,
        nationality: d.nationality,
        movies: movieByDirector?.map((m) => {
          return {
            title: m.title,
            release: m.release,
          };
        }),
      };
    });
    res.status(200).json(directorDataFormat);
  } catch (error) {
    next(error);
  }
});

module.exports = directorRouter;
