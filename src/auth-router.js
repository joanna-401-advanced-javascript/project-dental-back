'use strict';

const express = require('express');
const authRouter = express.Router();

authRouter.get('/test', (request, response, next) => {
  response.send('SUCCESS: HIT TEST ROUTE');
});

module.exports = authRouter;