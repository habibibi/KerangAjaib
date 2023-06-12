const express = require('express');
const router = express.Router();
const { queryHandlerAPI } = require('../manager/query.manager');

/**
 * POST /query
 * Required Body Parameters:
 * - query: (string) The query to be executed.
 * - sessionID: (string) The ID of the session.
 * - algo: (string) The algorithm to use for the query ("BM"/"KMP").
 */
router.post('/query', queryHandlerAPI);
module.exports = router;
