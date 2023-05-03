const express = require('express');
const router = express.Router();
const Query = require('../models/query.model');

// Get all queries
router.get('/queries', async (req, res) => {
    try {
      const queries = await Query.findAll();
      res.json(queries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Create a new query
router.post('/queries', async (req, res) => {
  try {
    const query = await Query.create(req.body);
    res.status(201).json(query);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a query
router.delete('/queries/:query', async (req, res) => {
    try {
        const query = await Query.findByPk(req.params.query);
        if (query) {
            await query.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Query not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
