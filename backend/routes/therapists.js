var express = require("express");
var router = express.Router();
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkBody");
require("../models/connection");
const Therapist = require("../models/therapist");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//SIGN UP
router.post("/signup", (req, res) => {
  if (
    !checkBody(req.body, [
      "name",
      "firstname",
      "password",
      "email",
      "phone",
      "avatar",
    ])
  ) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  Therapist.findOne({ name: req.body.name }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newTherapist = new Therapist({
        name: req.body.name,
        firstname: req.body.firstname,
        password: hash,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar,
        token: uid2(32),
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

  Therapist.findOne({ email: req.body.email }).then((data) => {
    const password = req.body.password;

    //pour comparer le password dans BDD et le mdp haché entré dans le body
    if (data && bcrypt.compareSync(password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "Therapist not found" });
    }
  });
});

//GET ALL PATIENTS
router.post("/patients", (req, res) => {
  console.log(req.body);
  if (!checkBody(req.body, ["token"])) {
    res.json({ result: false, message: "Missing therapist token" });
    return;
  }

  Therapist.findOne({ _id: req.body.token })
    .populate("patients")
    .then((therapist) => {
      if (therapist) {
        res.json({ result: true, patients: therapist.patients });
        return;
      }
      res.json({ result: false, message: "No therapist found" });
    });
});

module.exports = router;
