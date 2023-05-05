const express = require('express');
const router = express.Router();
const Query = require('../models/query.model');

router.post('/query', async (req, res) => {
  const { input, output, sessionID } = req.body;
  const newQuery = new Query({ input, output, sessionID });
  try {
    await newQuery.save();
    res.json(newQuery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/query', async (req, res) => {
  try {
    const result = await Query.deleteMany({});
    res.json({ message: `${result.deletedCount} documents deleted.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/query', async (req, res) => {
  const query = await Query.find().select({ _id: 0, __v: 0 });
  res.json(query);
});

module.exports = router;
