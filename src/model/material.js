'use strict';

const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('materials', materialSchema);
