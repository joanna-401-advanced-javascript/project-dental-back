'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = Schema({
  name: { type: String, required: true },
  details: [{type: Schema.Types.ObjectId, ref: 'details'}],
});

module.exports = mongoose.model('materials', materialSchema);
