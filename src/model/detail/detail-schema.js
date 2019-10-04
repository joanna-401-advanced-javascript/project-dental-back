'use strict';

const mongoose = require('mongoose');

const detailSchema = mongoose.Schema({
  reference: { type: String, required: true },
  method: { type: String },
  value: { type: String },
  materialId: { type: mongoose.Schema.ObjectId, ref: 'materials' },
});

module.exports = mongoose.model('details', detailSchema);
