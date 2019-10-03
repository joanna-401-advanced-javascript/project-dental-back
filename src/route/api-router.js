'use strict';

const express = require('express');
const router = express.Router();

const modelFinder = require('../middleware/model-finder');
const auth = require('../middleware/auth');

// const Material = require('../model/material');
// const Detail = require('../model/detail');

router.param('model', modelFinder);

router.get('/api/v1/:model', auth(), handleGetAll);
router.get('/api/v1/:model/:id', auth(), handleGetOne);
router.post('/api/v1/:model', auth(), handlePost);
router.put('/api/v1/:model/:id', auth(), handlePut);
router.delete('/api/v1/:model/:id', auth(), handleDelete);

function handleGetAll(request, response, next) {
  request.model.get()
    .then((result) => response.json(result))
    .catch(next);
}

function handleGetOne(request, response, next) {
  const id = request.params.id;
  request.model.get(id)
    .then((result) => response.json(result[0]))
    .catch(next);
}

function handlePost(request, response, next) {
  const data = request.body;
  request.model.post(data)
    .then((result) => response.json(result))
    .catch(next);
}

function handlePut(request, response, next) {
  const id = request.params.id;
  const data = request.body;
  request.model.put(id, data)
    .then((result) => response.json(result))
    .catch(next);
}

function handleDelete(request, response, next) {
  const id = request.params.id;
  request.model.delete(id)
    .then((result) => {
      console.log('DELETE RESULT', result);
      response.status(204);
    })
    .catch(next);
}

module.exports = router;

