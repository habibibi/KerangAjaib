const express = require('express');
const router = express.Router();
const QNA = require('../models/qna.model');

router.post('/qna', async (req, res) => {
  const { question, answer } = req.body;
  const newQNA = new QNA({ question, answer });
  try {
    await newQNA.save();
    res.json(newQNA);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/qna/:question', async (req, res) => {
  const { question } = req.params;
  const { answer } = req.body;

  try {
    let qna = await QNA.findOneAndUpdate(
      { question }, // search for the document with the given question
      { answer }, // update the answer with the given value
      { new: true, upsert: true } // options to return the updated document or create a new one if it doesn't exist
    );

    res.json(qna); // return the updated or newly created document
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/qna/:question', async (req, res) => {
  const { question } = req.params;

  try {
    await QNA.deleteOne({ question });
    res.json({ message: `QnA with question "${question}" has been deleted.` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/qna', async (req, res) => {
  try {
    const result = await QNA.deleteMany({});
    res.json({ message: `${result.deletedCount} documents deleted.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/qna', async (req, res) => {
  const qna = await QNA.find().select({ _id: 0, __v: 0 });
  res.json(qna);
});

module.exports = router;
