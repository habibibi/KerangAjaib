const express = require('express');
const router = express.Router();
const Query = require('../models/query.model');

router.get('/query', async (req, res) => {
  const query = await Query.find();
  res.json(query);
});

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

module.exports = router;
