const express = require('express');
const router = express.Router();
const Session = require('../models/session.model');

router.get('/session', async (req, res) => {
  const session = await Session.find();
  res.json(session);
});

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

module.exports = router;
