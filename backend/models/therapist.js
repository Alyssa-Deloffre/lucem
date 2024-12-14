const mongoose = require("mongoose");

const therapistSchema = mongoose.Schema({
  name: String,
  firstname: String,
  password: String,
  token: String,
  email: String,
  phone: Number,
  notifications: { type: Array, default: [] },
  avatar: { type: String, default: "" },
  patients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "patients",
    default: [],
  },
  description: String,
});

const Therapist = mongoose.model("therapists", therapistSchema);

module.exports = Therapist;
