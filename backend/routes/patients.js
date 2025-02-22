var express = require('express');
var router = express.Router();
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/checkBody');
require('../models/connection');
const Patient = require('../models/patient');
const Therapist = require('../models/therapist');

router.get('/getByEmail/:email', (req, res) => {
    Patient.findOne({ email: req.params.email }).then((patient) => {
        if (patient) {
            res.json({ result: true, data: patient });
        } else {
            res.json({ result: false, message: 'User not found' });
        }
    });
});

// ---- SIGN UP
router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ['name', 'firstname', 'password', 'email'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    Patient.findOne({ email: req.body.email }).then(async (data) => {
        if (data === null) {
            // Hashage du mot de passe
            const hash = bcrypt.hashSync(req.body.password, 10);

            // Récupération du therapist correspondant
            const therapist = await Therapist.findOne({
                token: req.body.therapist,
            }).then((data) => data);

            const newPatient = new Patient({
                firstname: req.body.firstname,
                name: req.body.name,
                email: req.body.email,
                password: hash,
                token: uid2(32),
                phone: req.body.phone,
                birthdate: req.body.birthdate,
                therapist: therapist ? [therapist._id] : [], // Si un therapist a été trouvé on l'jaoute sinon tableau vide
                avatar: req.body.avatar,
            });

            newPatient.save().then((newPatient) => {
                // Ajouter le patient au therapist
                Therapist.updateOne(
                    { token: req.body.therapist },
                    { $push: { patients: newPatient._id } }
                ).then(() => {
                    res.json({ result: true, token: newPatient.token });
                });
            });
        } else {
            // Patient already exists in database
            res.json({ result: false, error: 'Patient already exists' });
        }
    });
});

// ---- SIGN IN
router.post('/signin', (req, res) => {
    if (!checkBody(req.body, ['email', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    Patient.findOne({ email: req.body.email }).then((data) => {
        const password = req.body.password;

        if (data && bcrypt.compareSync(password, data.password)) {
            res.json({ result: true, token: data.token });
        } else {
            res.json({ result: false, error: 'Patient not found' });
        }
    });
});

// ---- Lier un therapist et un patient
router.put('/addTherapist', async (req, res) => {
    if (!checkBody(req.body, ['tokenPatient', 'tokenTherapist'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    const { tokenPatient, tokenTherapist } = req.body;

    // Get id patient & therapist
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
                'Therapist token and/or the patient token do not match an existing user',
        });
        return;
    }

    if (patient.therapist.includes(therapist._id)) {
        res.json({
            result: false,
            message: 'Therapist and patient are already linked',
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
            message:
                'Therapist and patient accounts have been successfully linked',
        });
        return;
    }
    res.json({
        result: false,
        message: 'Therapist and/or patient accounts could not be linked',
    });
});

// ---- Délier un therapist et un patient
router.put('/removeTherapist', async (req, res) => {
    if (!checkBody(req.body, ['tokenPatient', 'tokenTherapist'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
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
                'Therapist token and/or the patient token do not match an existing user',
        });
        return;
    }

    if (!patient.therapist.includes(therapist._id)) {
        res.json({
            result: false,
            message: 'Patient and the therapist are not linked',
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
            message: 'Therapist and patient accounts have been unlinked',
        });
        return;
    }
    res.json({
        result: false,
        message: 'Therapist and/or patient accounts could not be unlinked',
    });
});

// ---- Récupére tous les therapist d'un patient
router.get('/getalltherapists', (req, res) => {
    Therapist.find().then((data) => res.json({ result: true, data: data }));
});

// ----- GET ONE PATIENT
router.get('/getPatient/:token', (req, res) => {
    Patient.findOne({ token: req.params.token })
        .populate('therapist')
        .then((patient) => {
            if (patient) {
                res.json({ result: true, data: patient });
            } else {
                res.json({ result: false, message: 'User not found' });
            }
        });
});

module.exports = router;
