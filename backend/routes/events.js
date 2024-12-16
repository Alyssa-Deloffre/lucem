var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const Event = require("../models/event");
const SleepGlobal = require("../models/sleepGlobal");
const Patient = require("../models/patient");
const MoodGlobal = require('../models/moodGlobal')

// ---- Ajouter un récap sommeil à sleep_globals et à event
router.post("/addSleepGlobal", (req, res) => {
  if (!checkBody(req.body, ["token", "date", "data"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const { token, date, data } = req.body;
  //récupérer l'id du patient avec le token
  Patient.findOne({ token: token }).then((patient) => {
    if (patient !== null) {
      const patientId = patient._id;
      console.log(data);
      //Ajouter event dans sleep_globals

      const newSleepGlobal = new SleepGlobal({
        start: data.sleepTime,
        end: data.wakeTime,
        nightwaking: data.nightWake,
        sleepquality: data.sleepQuality,
        details: data.details,
        wakingquality: data.wakeQuality,
      });

      newSleepGlobal.save().then((newSleep) => {
        //relier event de sleep_globals à event

        const newEvent = new Event({
          user: patientId,
          type: "sleep",
          ref: newSleep._id,
          date: date,
        });
        newEvent.save().then(() => {
          res.json({ result: true });
        });
      });
    }
  });
});


// ---- Ajouter un récap mood à mood_globals et à event
router.post("/addMoodGlobal", (req, res) => {
  if (!checkBody(req.body, ["token", "date", "data"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }


  const { token, date, data } = req.body;
  //récupérer l'id du patient avec le token
  Patient.findOne({ token: token }).then((patient) => {
    if (patient !== null) {
      const patientId = patient._id;
      console.log(data);
      //Ajouter event dans mood_globals
      const newMoodGlobal = new MoodGlobal (data)
      newMoodGlobal.save().then(
        (newMood) => {
          const newEvent = new Event ({
            user: patientId,
            type: "mood",
            ref: newMood._id,
            date: date,
          })
          newEvent.save().then(() => {
            res.json({ result: true });
          });
        }
      )
    }})
})


// ---- Retrouver tous les événements d'un patient par date
router.post("/getPatientEventsByDate", async (req, res) => {
  if (!checkBody(req.body, ["patientToken", "date"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const { patientToken, date } = req.body;

  const patient = await Patient.findOne({ token: patientToken });

  if (!patient) {
    res.json({
      result: false,
      message: "Aucun patient n'a été trouvé avec ce token.",
    });
    return;
  }
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();
  const startDate = new Date(year, month, day);
  const endDate = new Date(year, month, day + 1);
  console.log(patient._id)
  const events = await Event.find({
    user: patient._id,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  })
  .populate("ref");
  console.log('events : ', events)
  if (events.length > 0) {
    res.json({ result: true, events: events });
    return;
  }
  res.json({ result: false });
});

module.exports = router;
