const mongoose = require('mongoose');

const qnaSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, {
  collection: 'qna'
});

const QNA = mongoose.model('QNA', qnaSchema);

module.exports = QNA;
