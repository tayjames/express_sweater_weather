var express = require('express');
var router = express.Router();
var User = require('./../models').User;

const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuidv4 = require('uuid/v4');


/* GET users listing. */
router.post('/', function(req, res, next) {
  if (req.body.email && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password == req.body.passwordConfirmation) {
      User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        apiKey: uuidv4()
      })
      .then(user =>{
        res.setHeader("Content-type", "application/json");
        res.status(201).send(JSON.stringify({apiKey: user.apiKey}));
      })
      .catch(error => {
        res.setHeader("Content-type", "application/json");
        res.status(500).send({ error });
      });
    } else {
      res.setHeader("Content-type", "application/json");
      res.status(401).send(JSON.stringify("Passwords do not match"));
    }
  } else {
    res.setHeader("Content-type", "application/json");
    res.status(401).send(JSON.stringify("Missing field"));
  }
});

module.exports = router;
