const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    name : String,
    firstname : String,
    password : String,
    token : String,
    email : String,
    phone : Number,
    therapist : { type :[mongoose.Schema.Types.ObjectId], ref: 'therapists'} || null,
    birthdate : Date,
    firstmeeting : Date,
    drugs : {type : Array, default : []},
    notifications : {type : Array, default : []},
    avatar : { type :String, default : ''},
})

const Patient = mongoose.model('patients', patientSchema);

module.exports = Patient;