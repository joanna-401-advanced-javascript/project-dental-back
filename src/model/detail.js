'use strict';

const mongoose = require('mongoose');

const detailSchema = mongoose.Schema({
  reference: { type: String, required: true },
  method: { type: String },
  value: { type: String },
});

module.exports = mongoose.model('details', detailSchema);
