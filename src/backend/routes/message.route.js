const express = require('express');
const router = express.Router();
const Message = require('../models/message.model');
const ObjectId = require('mongoose').Types.ObjectId;

router.post('/message', async (req, res) => {
  const { text, sender, sessionID } = req.body;
  console.log("before convert", sessionID)
  const id = new ObjectId(sessionID);
  console.log("after convert", id)
  const newMessage = new Message({ text:text, sender:sender, sessionID:id });
  try {
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/message', async (req, res) => {
  try {
    const result = await Message.deleteMany({});
    res.json({ message: `${result.deletedCount} documents deleted.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/message', async (req, res) => {
  const query = await Message.find().select({ __v: 0 });
  res.json(query);
});

module.exports = router;
