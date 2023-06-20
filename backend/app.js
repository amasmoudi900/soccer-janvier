// import express module
const express = require("express");
// import bodyparser
const bodyParser = require("body-parser");
// import bcrypt module
const bcrypt = require("bcrypt");
// import multer module
const multer = require("multer");
// import path module
const path = require("path");
// import axios module
const axios = require("axios");

// import mongoose module
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/chawkiBroDB");

// Creates Express Application
const app = express();

// Models Imporation
const Match = require("./models/match");
const Team = require("./models/team");
const User = require("./models/user");
const Player = require("./models/player");
const { $ } = require("protractor");

// Application Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
// ShortCut
app.use("/myFiles", express.static(path.join("backend/images")));
// Media Types
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});

// Business Logic : Get All Matches
app.get("/api/matches", (req, res) => {
  console.log("Here into BL: Get ALL matches");
  Match.find().then((docs) => {
    res.status(200).json({ matches: docs, message: "OK" });
  });
});

// Business Logic : Get Match By ID
app.get("/api/matches/:x", (req, res) => {
  console.log("Here into BL : Get Match By ID");
  let id = req.params.x;
  Match.findOne({ _id: id }).then((doc) => {
    res.json({ match: doc });
  });
});

// Business Logic : Delete Match By ID
app.delete("/api/matches/:id", (req, res) => {
  console.log("Here into BL : Delete Match By ID");
  let id = req.params.id;
  Match.deleteOne({ _id: id }).then((result) => {
    console.log("Here response after delete", result);
    result.deletedCount == 1
      ? res.json({ msg: "Deleted With Success" })
      : res.json({ msg: "Not Deleted" });
  });
});

// Business Logic : Add Match
app.post("/api/matches", (req, res) => {
  console.log("Here into BL : Add Match");
  let obj = new Match(req.body);
  obj.save();
  res.status(200).json({ message: "Added with success" });
});

// Business Logic : Edit Match
app.put("/api/matches", (req, res) => {
  console.log("Here into BL : Edit Match", req.body);
  let newMatch = req.body;
  Match.updateOne({ _id: newMatch._id }, newMatch).then((result) => {
    console.log("Here result after update", result);
    result.nModified == 1
      ? res.json({ message: "Edited With Success" })
      : res.json({ message: "Echec" });
  });
});

// Business Logic: Add Team
app.post("/api/teams", (req, res) => {
  console.log("Here into BL: Add Team", req.body);
  let teamObj = new Team({
    teamName: req.body.name,
    teamStadium: req.body.stadium,
    teamOwner: req.body.owner,
  });
  teamObj.save((err, doc) => {
    console.log("Here error", err);
    console.log("Here doc", doc);
    err ? res.json({ msg: "Error" }) : res.json({ msg: "Added with success" });
  });
});

// Business Logic: Signup
app.post(
  "/api/users/signup",
  multer({ storage: storageConfig }).single("img"),
  (req, res) => {
    console.log("Here into signup", req.body);
    bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
      console.log("Here crypted Pwd", cryptedPwd);
      req.body.pwd = cryptedPwd;
      req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${
        req.file.filename
      }`;
      let user = new User(req.body);
      user.save((err, doc) => {
        err
          ? res.json({ msg: "Error" })
          : res.json({ msg: "Added with success" });
      });
    });
  }
);

// Business Logic: Login
// response : 0 => Email Error
// response : 1 => Pwd Error
// response : 2 => Success
app.post("/api/users/login", (req, res) => {
  console.log("Here Into BL: Login", req.body);
  let user;
  // Check If Email Exists
  User.findOne({ email: req.body.email })
    .then((doc) => {
      console.log("Here doc", doc);
      user = doc;
      // Send Email Error Msg
      if (!doc) {
        res.json({ msg: "0" });
      } else {
        // Check PWD
        return bcrypt.compare(req.body.pwd, doc.pwd);
      }
    })
    .then((isEqual) => {
      console.log("Here isEqual", isEqual);
      // Send Pwd Error Msg
      if (!isEqual) {
        res.json({ msg: "1" });
      } else {
        let userToSend = {
          userId: user._id,
          email: user.email,
          fName: user.firstName,
          lName: user.lastName,
        };
        res.json({ user: userToSend, msg: `2` });
      }
    });
});

// Business Logic: Search Matches By scoreOne or scoreTwo
app.post("/api/matches/searchMatches", (req, res) => {
  console.log("Here into BL : Search ALl matches", req.body);
  Match.find({
    $or: [{ scoreOne: req.body.s1 }, { scoreTwo: req.body.s2 }],
  }).then((docs) => {
    res.json({ findedMatches: docs, msg: "Done" });
  });
});

// Business Logic: Search Weather From API
app.get("/api/weather/:city", (req, res) => {
  console.log("Here into BL: Search weather by city", req.params.city);
  let key = "62ee756a34835483299877a61961cafb";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${key}&units=metric`;
  axios.get(apiURL).then((weatherResponse) => {
    let data = weatherResponse.data;
    console.log("Data", data);
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;
    let result = {
      temperature: data.main.temp,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      icone: `https://openweathermap.org/img/wn/${icon}@4x.png`,
      description: description,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
    };
    res.json({ result: result });
  });
});

// Business Logic: Get User By Email
app.get("/api/users/:email", (req, res) => {
  console.log("Here into BL: get profile", req.params.email);
  User.findOne({ email: req.params.email }).then((doc) => {
    res.json({ user: doc });
  });
});

// Business Logic: Edit Profile
app.put("/api/users", (req, res) => {
  console.log("Here into BL: Edit user", req.body);
  User.updateOne({ _id: req.body._id }, req.body).then((response) => {
    if (response.nModified == "1") {
      res.json({ msg: "Updated with success" });
    } else {
      res.json({ msg: "Error" });
    }
  });
});

// Business Logic : Add Player
app.post("/api/players", (req, res) => {
  console.log("here into BL : Add Player", req.body);
  let p = new Player(req.body);
  p.save();
  res.json({ msg: "Added with success" });
});

// Business Logic: Get All Players
app.get("/api/players", (req, res) => {
  console.log("Here into BL: get all players");
  Player.find().then((docs) => {
    res.json({ playersTab: docs });
  });
});

// Business Logic: Get Player By Id
app.get("/api/players/:id", (req, res) => {
  console.log("Here into BL: get  player by id", req.params.id);
  Player.findOne({ _id: req.params.id }).then((doc) => {
    res.json({ player: doc });
  });
});

// Business Logic: Delete Player By Id
app.delete("/api/players/:id", (req, res) => {
  console.log("Here into BL: Delete  player by id", req.params.id);
  Player.deleteOne({ _id: req.params.id }).then((response) => {
    response.deletedCount == 1
      ? res.json({ isDeleted: true })
      : res.json({ isDeleted: false });
  });
});

// Business Logic: Update Player
app.put("/api/players", (req, res) => {
  console.log("Here into BL: Update Player", req.body);
  Player.updateOne({ _id: req.body._id }, req.body).then((response) => {
    if (response.nModified == 1) {
      res.json({ msg: "OK" });
    } else {
      res.json({ msg: "NOK" });
    }
  });
});
// Make Application exportable
module.exports = app;
