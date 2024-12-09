const mongoose = require('mongoose');

const therapistSchema = mongoose.Schema({
    name : String,
    firstname : String,
    password : String,
    token : String,
    email : String,
    phone : Number,
    notifications : {type : Array, default : []},
    avatar : { type :String, default : ''},
})

const Therapist = mongoose.model('therapists', therapistSchema);

module.exports = Therapist;