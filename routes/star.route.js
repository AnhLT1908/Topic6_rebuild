const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");

const starRouter = express.Router();

starRouter.use(bodyParser.json());

starRouter.get("/born-in/:year", async (req, res, next) => {
  try {
    const year = req.params.year;
    const startYear = new Date(`${year}-01-01`);
    const endYear = new Date(`${year}-12-31`);
    const listStar = await db.Star.find({
      dob: { $gte: startYear, $lte: endYear },
    });
    res.status(200).json(listStar);
  } catch (error) {
    next(error);
  }
});

starRouter.get("/birthday-on/:month/:day", async (req, res, next) => {
  try {
    const { month, day } = req.params;

    // Parse the month and day as numbers
    const monthInt = parseInt(month, 10);
    const dayInt = parseInt(day, 10);

    const starData = await db.Star.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dob" }, monthInt] },
          { $eq: [{ $dayOfMonth: "$dob" }, dayInt] }
        ]
      }
    });

    res.status(200).json(starData);
  } catch (error) {
    next(error);
  }
});

module.exports = starRouter;
