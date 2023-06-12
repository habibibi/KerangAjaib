const express = require('express');
const router = express.Router();
const manager = require('../manager/session.manager');

// req body : name
router.post('/session', manager.newSessionAPI);

// req body : none
router.get('/session/messages', manager.fetchSessionMsgAPI);

// req body : newName
router.put('/session/:sessionId', manager.updateSessionNameAPI);

module.exports = router;
