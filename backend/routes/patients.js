var express = require('express');
var router = express.Router();
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const {checkBody} = require("../modules/checkBody");
require("../models/connection");
const Patient = require("../models/patient");
const Therapist = require('../models/therapist');

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
   Patient.findOne({ name: req.body.name }).then(async (data) => {
      if (data === null) {
        const hash = bcrypt.hashSync(req.body.password, 10);
    
    const therapistId = await Therapist.findOne({token : req.body.therapist}).then(data)

        const newPatient = new Patient({
          firstname : req.body.firstname,
          name : req.body.name,
          email : req.body.email,
          password : hash,
          token : uid2(32),
          phone : req.body.phone,
          birthdate : req.body.birthdate,
          therapist : [therapistId._id],
          avatar : req.body.avatar
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


  //GET all therapists
  router.get('/getalltherapists', (req, res) => {
    Therapist.find()
    .then(data => res.json({result : true, data : data}))
  })

module.exports = router;
