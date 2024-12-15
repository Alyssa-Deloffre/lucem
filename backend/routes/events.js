var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");
const Event = require("../models/event");
const SleepGlobal = require("../models/sleepGlobal");
const Patient = require("../models/patient");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Ajouter un récap sommeil à sleep_globals et à event
router.post('/addSleepGlobal', (req, res) => {
  if (!checkBody(req.body, ["token"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const { token, date, data } = req.body
  //récupérer l'id du patient avec le token
  Patient.findOne({ token: token }).then(patient => {
    if (patient !== null) {
      const patientId = data._id
      console.log(data)
      //Ajouter event dans sleep_globals

      const newSleepGlobal = new SleepGlobal({
        start: data.sleepTime,
        end: data.wakeTime,
        nightwaking: data.nightWake,
        sleepquality: data.sleepQuality,
        details: data.details,
        wakingquality: data.wakeQuality,
      })

      newSleepGlobal.save().then((newSleep) => {
        //relier event de sleep_globals à event

        const newEvent = new Event({
          user: patientId,
          type: 'sleep',
          ref: newSleep._id,
          date: date
        })
        newEvent.save().then(newEv => {
          res.json({ result: true })
        })
      }
      )
    }
  })
})

module.exports = router;
