var express = require('express');
var router = express.Router();
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const {checkBody} = require("../modules/checkBody");
require("../models/connection");
const Patient = require("../models/patient");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getByEmail/:email', (req, res) => {
  Patient.findOne({ email: req.params.email }).then((patient) => {
    if (patient) {
      res.json({ result: true, data: patient });
    } else {
      res.json({ result: false, message: "User not found" });
    }
  });
})

//SIGN UP
router.post("/signup", (req, res) => {
    if (!checkBody(req.body, [ "name", "firstname", "password", "email"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }
   Patient.findOne({ name: req.body.name }).then((data) => {
      if (data === null) {
        const hash = bcrypt.hashSync(req.body.password, 10);

        const newPatient = new Patient({
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
    Patient.findOne({ email: req.body.email }).then((data) => {
      const password = req.body.password;

      if (data && bcrypt.compareSync(password, data.password)) {
        res.json({ result: true, token: data.token });
      } else {
        res.json({ result: false, error: "Patient not found" });
      }
    });
  });


module.exports = router;
