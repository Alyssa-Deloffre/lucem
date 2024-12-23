const mongoose = require('mongoose');

const MoodGlobalSchema = mongoose.Schema({
    quality: Number,
    emotions: [],
    influence: [],
    details: String,
});

const MoodGlobal = mongoose.model('mood_globals', MoodGlobalSchema);

module.exports = MoodGlobal;
