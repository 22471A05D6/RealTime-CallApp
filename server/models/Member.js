const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  lastCallStatus: {
    type: String,
    enum: ['picked', 'not-picked'],
    default: null
  },
  isMuted: { type: Boolean, default: false },

  // NEW:
  callSid: { type: String, default: null },
  participantSid: { type: String, default: null },
});

module.exports = mongoose.model('Member', memberSchema);
