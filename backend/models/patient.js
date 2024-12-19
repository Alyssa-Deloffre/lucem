const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    name: String,
    firstname: String,
    password: String,
    token: String,
    email: String,
    phone: String,
    therapist:
        { type: [mongoose.Schema.Types.ObjectId], ref: 'therapists' } || [],
    birthdate: Date,
    firstmeeting: Date,
    drugs: { type: Array, default: [] },
    notifications: { type: Array, default: [] },
    avatar: Number,
});

const Patient = mongoose.model('patients', patientSchema);

module.exports = Patient;
