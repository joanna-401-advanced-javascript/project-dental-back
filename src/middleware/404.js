'use strict';
/**
 * API Server Module
 * @module src/middleware/404
 */

/**
 * Middleware to send error message when resource not found
 * @param request
 * @param response
 * @param next
 */
module.exports = (request, response, next) => {
  let error = { error: 'Resource Not Found' };
  response.status(404).json(error);
};
