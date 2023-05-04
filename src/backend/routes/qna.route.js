const express = require('express');
const router = express.Router();
const QNA = require('../models/qna.model');

router.get('/qna', async (req, res) => {
  const qna = await QNA.find();
  res.json(qna);
});

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

module.exports = router;
