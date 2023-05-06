const express = require('express');
const router = express.Router();
const Session = require('../models/session.model');
const mongoose = require('mongoose');

router.post('/session', async (req, res) => {
  const {  name } = req.body;
  const newSession = new Session({ name });
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
  const session = await Session.find().select({ __v: 0 });
  res.json(session);
});

router.put('/session/:sessionID', async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.sessionID);
    const session = await Session.updateOne({"_id": id}, {$set: {"name": req.body.name}});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/session/lastinsert', async (req, res) => {
  const session = await Session.find().sort({_id:-1}).limit(1);
  res.json(session);
});

module.exports = router;
