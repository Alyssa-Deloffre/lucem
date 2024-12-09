var express = require('express');
var router = express.Router();
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

require("../models/connection");
const Patient = require("../models/patient");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//SIGN UP
router.post("/signup", (req, res) => {
    if (!checkBody(req.body, [ "name", "firstname", "password", "email", "phone", "therapist", "birthdate", "firstmeeting", "drugs", "notifications", "avatar"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }
   Patient.findOne({ name: req.body.name }).then((data) => {
      if (data === null) {
        const hash = bcrypt.hashSync(req.body.password, 10);

        const newPatient = new User({
          firstname : req.body.firstname,
          name : req.body.name,
          email : req.body.email,
          password : hash,
          token : uid2(32),
        });

        newPatient.save().then((newDoc) => {
          res.json({ result: true, token: newDoc.token });
        });
      } else {
        // Patient already exists in database
        res.json({ result: false, error: "Patient already exists" });
      }
    });
  });

//SIGN IN
router.post("/signin", (req, res) => {
    if (!checkBody(req.body, ["email", "password"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }
    Patient.findOne({ patientname: req.body.email }).then((data) => {
      const password = req.body.password;
      if (data && bcrypt.compareSync(password, data.password)) {
        res.json({ result: true, token: data.token });
      } else {
        res.json({ result: false, error: "Patient not found" });
      }
    });
  });


module.exports = router;
