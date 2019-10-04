'use strict';
/**
 * Auth Routes Module
 * @module src/route/auth-router
 */

const express = require('express');
const router = express.Router();
const User = require('../model/user');
const auth = require('../middleware/auth');

// router.get('/', (request, response, next) => {
//   response.send('SUCCESS!');
// });

router.post('/signup', signUp);
router.post('/signin', auth(), signIn);

/**
 * This function signs up a new user
 * @route POST /signup
 * @group User authentication
 * @param {string} username.query.required - user's username
 * @param {string} password.query.required - user's password
 * @returns {object} 200 - A token for authentication is generated
 * @returns {Error}  default - Unexpected error
 */
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

/**
 * This function signs a user in using username and password
 * @route POST /signin
 * @group User authentication
 * @param {string} username.query.required - user's username
 * @param {string} password.query.required - user's password
 * @returns {object} 200 - A token for authentication is generated
 * @returns {Error}  default - Unexpected error
 */
function signIn(request, response, next) {
  response.set('token', request.token);
  response.cookie('auth', request.token);
  response.send(request.token);
}

module.exports = router;
