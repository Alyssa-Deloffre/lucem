const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    user : { type :mongoose.Schema.Types.ObjectId, ref: 'patients'},
    type : { type :mongoose.Schema.Types.ObjectId, ref: 'sleep_globals' || "mood_globals"},
    date : Date,
})


const Event = mongoose.model('events', eventSchema);

module.exports = Event;