var express = require("express");
var router = express.Router();
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

require("../models/connection");
const Therapist = require("../models/therapist");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


//SIGN UP 
router.post("/signup", (req, res) => {
    if (!checkBody(req.body, [ "name", "firstname", "password", "email", "phone", "notifications", "avatar"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }
  
   Therapist.findOne({ name: req.body.name }).then((data) => {
      if (data === null) {
        const hash = bcrypt.hashSync(req.body.password, 10);
  
        const newTherapist = new Therapist({
          name : req.body.name,
          firstname : req.body.firstname,
          email : req.body.name,
          password : hash,
          token : uid2(32),
        });
  
        newTherapist.save().then((newTher) => {
          res.json({ result: true, token: newTher.token });
        });
      } else {
        // Therapist already exists in database
        res.json({ result: false, error: "Therapist already exists" });
      }
    });
  });


//SIGN IN
router.post("/signin", (req, res) => {
    if (!checkBody(req.body, ["email", "password"])) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }
  
    Therapist.findOne({ name: req.body.email }).then((data) => {
      const password = req.body.password;
  
      if (data && bcrypt.compareSync(password, data.password)) {
        res.json({ result: true, token: data.token });
      } else {
        res.json({ result: false, error: "Therapist not found" });
      }
    });
  });


//GET ALL PATIENTS
router.get("/patients", (req, res) => {
  Patient.find().then((dataPatient) => {
    if (dataPatient) {
      let allPatients = [];
      for (let element of dataPatient) {
        if (element.patients) {
          element.patients.forEach((dataPatient) => {
            const add = allPatients.find((e) => e.name === data);
            if (add) {
              add.count += 1;
            } else {
              allPatients.push({ name : dataPatient, count : 1})
            }
          });
        }
      }
      res.json({result : true, patients : allPatients});
    } else {
      res.json({result : false, message : 'No patient found'})
    }
  });
});

module.exports = router;
