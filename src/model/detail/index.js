'use strict';

const schema = require('./detail-schema');
const MongooseModel = require('../mongoose-model');

class Detail extends MongooseModel {}

module.exports = new Detail(schema);