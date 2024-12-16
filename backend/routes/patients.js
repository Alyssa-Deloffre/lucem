var express = require("express");
var router = express.Router();
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkBody");
require("../models/connection");
const Patient = require("../models/patient");
const Therapist = require("../models/therapist");

// ---- GET users listing
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/getByEmail/:email", (req, res) => {
  Patient.findOne({ email: req.params.email }).then((patient) => {
    if (patient) {
      res.json({ result: true, data: patient });
    } else {
      res.json({ result: false, message: "User not found" });
    }
  });
});

// ---- SIGN UP
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["name", "firstname", "password", "email"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  Patient.findOne({ email: req.body.email }).then(async (data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const therapistId = await Therapist.findOne({
        token: req.body.therapist,
      }).then((data) => data._id);

      const newPatient = new Patient({
        firstname: req.body.firstname,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        phone: req.body.phone,
        birthdate: req.body.birthdate,
        therapist: therapistId && [therapistId],
        avatar: req.body.avatar,
      });

      newPatient.save().then((newPatient) => {
        // Ajouter le petient au therapist
        Therapist.updateOne(
          { token: req.body.therapist },
          { $push: { patients: newPatient._id } }
        ).then(() => {
          res.json({ result: true, token: newPatient.token });
        });
      });
    } else {
      // Patient already exists in database
      res.json({ result: false, error: "Patient already exists" });
    }
  });
});

// ---- SIGN IN
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

// ---- Add therapist
router.put("/addTherapist", async (req, res) => {
  if (!checkBody(req.body, ["tokenPatient", "tokenTherapist"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const { tokenPatient, tokenTherapist } = req.body;

  // Get id patient et therapist
  const patient = await Patient.findOne({
    token: tokenPatient,
  }).then((patient) => patient);

  const therapist = await Therapist.findOne({
    token: tokenTherapist,
  }).then((therapist) => therapist);

  if (!patient || !therapist) {
    res.json({
      result: false,
      message:
        "Therapist and/or patient token does not match registered user.",
    });
    return;
  }

  if (patient.therapist.includes(therapist._id)) {
    res.json({
      result: false,
      message: "Therapist and patient are already linked",
    });
    return;
  }

  // Ajouter le therapist au patient
  const respPatient = await Patient.updateOne(
    { _id: patient },
    { $push: { therapist: therapist._id } }
  ).then((data) => data);

  // Ajouter le patient au therapist
  const respTherapist = await Therapist.updateOne(
    { _id: therapist },
    { $push: { patients: patient._id } }
  ).then((data) => data);

  if (respPatient.modifiedCount + respTherapist.modifiedCount === 2) {
    res.json({
      result: true,
      message: "Les comptes therapist et patient ont bien été liés",
    });
    return;
  }
  res.json({
    result: false,
    message: "Les comptes therapist et/ou patient n'ont pas pu être liés",
  });
});

// ---- Remove therapist
router.put("/removeTherapist", async (req, res) => {
  if (!checkBody(req.body, ["tokenPatient", "tokenTherapist"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const { tokenPatient, tokenTherapist } = req.body;

  // Get id patient et therapist
  const patient = await Patient.findOne({
    token: tokenPatient,
  }).then((patient) => patient);

  const therapist = await Therapist.findOne({
    token: tokenTherapist,
  }).then((therapist) => therapist);

  if (!patient || !therapist) {
    res.json({
      result: false,
      message:
        "Le token du therapist et/ou le token patient ne correspondent pas à un utilisateur existant.",
    });
    return;
  }

  if (!patient.therapist.includes(therapist._id)) {
    res.json({
      result: false,
      message: "Le patient et le therapist ne sont pas rattachés",
    });
    return;
  }

  // Retirer le therapist au patient
  const respPatient = await Patient.updateOne(
    { _id: patient },
    { $pull: { therapist: therapist._id } }
  ).then((data) => data);

  // Retirer le patient au therapist
  const respTherapist = await Therapist.updateOne(
    { _id: therapist },
    { $pull: { patients: patient._id } }
  ).then((data) => data);

  if (respPatient.modifiedCount + respTherapist.modifiedCount === 2) {
    res.json({
      result: true,
      message: "Les comptes therapist et patient ont étés déliés",
    });
    return;
  }
  res.json({
    result: false,
    message: "Les comptes therapist et/ou patient n'ont pas pu être déliés",
  });
});

// ---- GET all therapists
router.get("/getalltherapists", (req, res) => {
  Therapist.find().then((data) => res.json({ result: true, data: data }));
});

module.exports = router;
