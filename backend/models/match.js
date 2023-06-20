// import mongoose module
const mongoose = require("mongoose");

// create match Schema
const matchSchema = mongoose.Schema({
  scoreOne: Number,
  scoreTwo: Number,
  teamOne: String,
  teamTwo: String
});

// create Model Name "Match"
const match = mongoose.model("Match", matchSchema);

// make match exportable
module.exports = match;
