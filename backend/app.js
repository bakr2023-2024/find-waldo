require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const { Map, Character, User } = require("./models");
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/:map/data", async (req, res) => {
  const map = await Map.findOne({ name: req.params.map });
  if (!map) {
    return res.status(404).json({ error: "Map not found" });
  }
  const data = await Character.aggregate([
    { $match: { map: map._id } },
    { $sample: { size: 3 } },
  ]);
  res.json(data);
});
app.post("/ingame", async (req, res) => {
  try {
    const character = await Character.findById(req.body._id);
    if (!character) {
      return res.json({ result: false });
    }
    const region = req.body.region;
    const result = character.checkRegion(region);
    console.log("region", region);
    console.log("character region", character.region);
    return res.json({
      result,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/leaderboard", async (req, res) => {
  const map = await Map.findOne({ name: req.body.map });
  const user = new User({
    username: req.body.username ? req.body.username : "guest",
    usertime: req.body.usertime,
    map: map._id,
  });
  await user.save();
  return res.sendStatus(200);
});
app.get("/:map/leaderboard", async (req, res) => {
  const map = await Map.findOne({ name: req.params.map });
  const users = await User.find(
    { map: map._id },
    { _id: 0, __v: 0, image: 0 }
  ).sort({
    usertime: 1,
  });
  return res.json(users);
});
module.exports = app;
