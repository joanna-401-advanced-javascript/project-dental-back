'use strict';

const express = require('express');
const authRouter = express.Router();

authRouter.get('/', (request, response, next) => {
  response.send('SUCCESS!');
});

module.exports = authRouter;
