var express = require('express');
var router = express.Router();
var User = require('./../models').User;

const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuidv4 = require('uuid/v4');

router.post('/', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.setHeader("Content-type", "application/json");
        res.status(200).send(JSON.stringify({apiKey: user.apiKey}));
      } else {
        res.setHeader("Content-type", "application/json");
        res.status(401).send(JSON.stringify("Incorrect Password"));
      }
    })
    .catch(error => {
      res.setHeader("Content-type", "application/json");
      res.status(401).send(JSON.stringify("Email not valid"));
    });
  } else {
    res.setHeader("Content-type", "application/json");
    res.status(401).send(JSON.stringify("Missing field"));
  }
});

module.exports = router;
