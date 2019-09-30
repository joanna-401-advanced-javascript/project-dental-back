'use strict';

const express = require('express');
const router = express.Router();

router.get('/test', (request, response, next) => {
  response.send('HIT TEST ROUTE');
});

module.exports = router;