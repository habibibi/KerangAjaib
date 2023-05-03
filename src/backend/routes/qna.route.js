const express = require('express');
const router = express.Router();
const QnA = require('../models/qna.model');

// GET all QnAs
router.get('/qnas', async (req, res) => {
  try {
    const qnas = await QnA.findAll();
    res.json(qnas);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET a QnA by question
router.get('/qnas/:question', async (req, res) => {
  try {
    const qna = await QnA.findByPk(req.params.question);
    if (!qna) {
      res.status(404).send('QnA not found');
    } else {
      res.json(qna);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST a new QnA
router.post('/qnas', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const qna = await QnA.create({ question, answer });
    res.json(qna);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// PUT update a QnA by question
router.put('/qnas/:question', async (req, res) => {
  try {
    const { answer } = req.body;
    const qna = await QnA.findByPk(req.params.question);
    if (!qna) {
      res.status(404).send('QnA not found');
    } else {
      await qna.update({ answer });
      res.json(qna);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE a QnA by question
router.delete('/qnas/:question', async (req, res) => {
  try {
    const qna = await QnA.findByPk(req.params.question);
    if (!qna) {
      res.status(404).send('QnA not found');
    } else {
      await qna.destroy();
      res.send('QnA deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
