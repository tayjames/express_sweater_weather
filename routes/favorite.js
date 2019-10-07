var express = require('express');
var router = express.Router();
var User = require('./../models').User;
var Favorite = require('./../models').Favorite

const fetch = require('node-fetch');
const uuidv4 = require('uuid/v4');

router.post('/', function(req, res, next) {
  if (req.body.location && req.body.apiKey) {
    User.findOne({
      where: {
        apiKey: req.body.apiKey
      }
    })
    .then(user => {
      if (user) {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+req.body.location+"&key="+process.env.GOOGLE_GEOCODE_API_KEY)
        .then(response => response.text())
        .then(result => JSON.parse(result)["results"][0])
        .then(coords => {
          if (coords) {

            Favorite.create({
              location: coords["formatted_address"],
              latitude: coords["geometry"]["lat"],
              longitude: coords["geometry"]["lng"],
              UserId: user.id
            })
            .then(favorite => {
              if (favorite) {
                res.setHeader("Content-type", "application/json");
                res.status(201).send(JSON.stringify(`${favorite.location} has been added to your favorites`))
                console.log("favorite")
              }})
          }
        })
        .catch(error => console.log("error"))
      }
    })
  } else { console.log("something went wrong")

  }
})

module.exports = router;
