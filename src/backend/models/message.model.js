const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  sessionID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'session' },
}, {
  collection: 'message'
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
