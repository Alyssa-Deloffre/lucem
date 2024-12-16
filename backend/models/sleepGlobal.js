const mongoose = require('mongoose');

const SleepGlobalSchema = mongoose.Schema({
    start : Date,
    end : Date,
    nightwaking : [{
        start : Date,
        duration : Date,
    }],
    sleepquality : Number,
    wakingquality : Number,
    details : String

})


const SleepGlobal = mongoose.model('sleep_globals', SleepGlobalSchema);

module.exports = SleepGlobal;