'use strict';

module.exports = (error, request, response, next) => {
  console.log('__SERVER_ERROR__', error);
  let currentError = { error: error.message || error };
  response.status(500).json(currentError);
};
