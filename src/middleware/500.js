'use strict';
/**
 * API Server Module
 * @module src/middleware/500
 */

/**
 * Error handling middleware
 * @param error
 * @param request
 * @param response
 * @param next
 */
module.exports = (error, request, response, next) => {
  console.log('__SERVER_ERROR__', error);
  let currentError = { error: error.message || error };
  response.status(500).json(currentError);
};
