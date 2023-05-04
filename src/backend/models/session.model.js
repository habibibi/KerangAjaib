const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
}, {
  collection: 'session'
});

const Session = mongoose.model('session', sessionSchema);

module.exports = Session;
