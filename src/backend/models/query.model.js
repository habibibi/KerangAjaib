const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  sessionID: { type: Number, required: true, ref: 'session' },
}, {
  collection: 'query'
});

const Query = mongoose.model('query', querySchema);

module.exports = Query;
