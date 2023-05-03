const express = require('express');
const router = express.Router();
const Session = require('../models/session.model');

// Get all sessions
router.get('/sessions', async (req, res) => {
    try {
        const sessions = await Session.findAll();
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new session
router.post('/sessions', async (req, res) => {
  try {
    const session = await Session.create({});
    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a session
router.delete('/sessions/:id', async (req, res) => {
    try {
        const session = await Session.findByPk(req.params.id);
        if (session) {
            await session.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Session not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
