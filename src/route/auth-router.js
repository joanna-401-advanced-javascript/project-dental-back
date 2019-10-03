'use strict';

const express = require('express');
const router = express.Router();
const User = require('../model/user');
const auth = require('../middleware/auth');

router.get('/', (request, response, next) => {
  response.send('SUCCESS!');
});

router.post('/signup', signUp);
router.post('/signin', auth(), signIn);

function signUp(request, response, next) {
  let user = new User(request.body);
  user.save()
    .then(user => {
      request.token = user.generateToken(user.role);
      request.user = user;
      response.set('token', request.token);
      response.cookie('auth', request.token);
      response.send(request.token);
    })
    .catch(next);
}

function signIn(request, response, next) {
  response.set('token', request.token);
  response.cookie('auth', request.token);
  response.send(request.token);
}

module.exports = router;
