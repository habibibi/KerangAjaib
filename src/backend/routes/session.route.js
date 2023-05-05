const express = require('express');
const router = express.Router();
const Session = require('../models/session.model');

router.post('/session', async (req, res) => {
  const { id, name } = req.body;
  const newSession = new Session({ id, name });
  try {
    await newSession.save();
    res.json(newSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/session', async (req, res) => {
  try {
    const result = await Session.deleteMany({});
    res.json({ message: `${result.deletedCount} documents deleted.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/session', async (req, res) => {
  const session = await Session.find().select({ _id: 0, __v: 0 });
  res.json(session);
});

module.exports = router;
