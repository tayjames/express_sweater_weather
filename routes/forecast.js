var express = require('express');
var router = express.Router();
var User = require('./../models').User;

const bcrypt = require('bcrypt');
const saltRounds = 10;
const fetch = require('node-fetch');

router.get('/', function(req, res, next) {
  if (req.body.apiKey) {
    User.findOne({
      where: {
        apiKey: req.body.apiKey
      }
    })
    .then(user => {
      console.log(user)
      if (user) {
        let google_url = "https://maps.googleapis.com/maps/api/geocode/json?address="+req.query.location+"&key="+process.env.GOOGLE_GEOCODE_API_KEY
        fetch(google_url)
        .then(response => response.text())
        // console.log(response)
        .then(result => JSON.parse(result)["results"][0]["geometry"]["location"])
        .then(coords => {
          let darksky_url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${coords["lat"]},${coords["lng"]}?exclude=minutely`
          fetch(darksky_url)
          .then(response => response.text())
          .then(result => {
            res.setHeader("Content-type", "application/json");
            res.status(201).send(JSON.parse(result));
            // console.log(result)
          })
        })
        .catch(error => {
          res.setHeader("Content-type", "application/json");
          res.status(401).send(JSON.strigify("No user found"));
        })
      }
    })
    .catch(error => {
      res.setHeader("Content-type", "application/json");
      res.status(401).send(JSON.stringify("API key does not match!"))
    })
  }
  else {
    res.setHeader("Content-type", "application/json");
    res.status(401).send(JSON.stringify("Missing an API key"))
  }
})

module.exports = router
