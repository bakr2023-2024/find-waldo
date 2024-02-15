const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const mapSchema = new mongoose.Schema({
  name: String,
});
const Map = mongoose.model("maps", mapSchema);
const characterSchema = new mongoose.Schema({
  name: String,
  image: String,
  region: {
    x1: Number,
    x2: Number,
    y1: Number,
    y2: Number,
  },
  map: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Map",
  },
});
characterSchema.method("checkRegion", function (region) {
  return (
    region.x >= this.region.x1 &&
    region.y >= this.region.y1 &&
    region.x <= this.region.x2 &&
    region.y <= this.region.y2
  );
});
const Character = mongoose.model("characters", characterSchema);
const userSchema = new mongoose.Schema({
  username: String,
  usertime: String,
  map: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Map",
  },
});
const User = mongoose.model("users", userSchema);
module.exports = { Map, Character, User };
