// import mongoose module
const mongoose = require("mongoose");

// create team Schema
const teamSchema = mongoose.Schema({
  teamName: String,
  teamOwner: String,
  teamStadium: String
});

// create Model Name "Team"
const team = mongoose.model("Team", teamSchema);

// make team exportable
module.exports = team;
