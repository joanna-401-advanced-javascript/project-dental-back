'use strict';
/**
 * Api Routes Module
 * @module src/route/api-router
 */

const express = require('express');
const router = express.Router();

const modelFinder = require('../middleware/model-finder');
const auth = require('../middleware/auth');

router.param('model', modelFinder);

router.get('/api/v1/:model', auth(), handleGetAll);
router.get('/api/v1/:model/:id', auth(), handleGetOne);
router.post('/api/v1/:model', auth(), handlePost);
router.put('/api/v1/:model/:id', auth(), handlePut);
router.delete('/api/v1/:model/:id', auth(), handleDelete);

/**
 * Function handles getting all from model
 * @route GET /api/v1/:model
 * @param {string} model required
 * @returns {object} 200 - An array of objects
 * @returns {Error}  default - Unexpected error
 */
function handleGetAll(request, response, next) {
  request.model.get()
    .then((result) => response.json(result))
    .catch(next);
}

/**
 * Function handles getting one from model
 * @route GET /api/v1/:model/:id
 * @param {string} model and id required
 * @returns {object} 200 - An object
 * @returns {Error}  default - Unexpected error
 */
function handleGetOne(request, response, next) {
  const id = request.params.id;
  request.model.get(id)
    .then((result) => response.json(result[0]))
    .catch(next);
}

/**
 * Function handles adding to model
 * @route POST /api/v1/:model/
 * @param {string} model required
 * @param {string} data to be added required
 * @returns {object} 200 - The object that was added
 * @returns {Error}  default - Unexpected error
 */
function handlePost(request, response, next) {
  const data = request.body;
  request.model.post(data)
    .then((result) => response.json(result))
    .catch(next);
}

/**
 * Function handles updating particular instance in model
 * @route PUT /api/v1/:model/:id
 * @param {string} model and id required
 * @param {string} new data required
 * @returns {object} 200 - The object that was added
 * @returns {Error}  default - Unexpected error
 */
function handlePut(request, response, next) {
  const id = request.params.id;
  const data = request.body;
  request.model.put(id, data)
    .then((result) => response.json(result))
    .catch(next);
}

/**
 * Function deletes from model
 * @route DELETE /api/v1/:model/:id
 * @param {string} model and id required
 * @returns {object} 204 - Return message states an object was deleted
 * @returns {Error}  default - Unexpected error
 */
function handleDelete(request, response, next) {
  const id = request.params.id;
  request.model.delete(id)
    .then((result) => {
      response.send(result);
      response.status(204);
    })
    .catch(next);
}

module.exports = router;

