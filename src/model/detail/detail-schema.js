'use strict';

const mongoose = require('mongoose');
// const material = require('./material');

const detailSchema = mongoose.Schema({
  reference: { type: String, required: true },
  method: { type: String },
  value: { type: String },
  materialId: { type: mongoose.Schema.ObjectId, ref: 'materials' },
});

// detailSchema.pre('save', () => {
//
// });

module.exports = mongoose.model('details', detailSchema);
