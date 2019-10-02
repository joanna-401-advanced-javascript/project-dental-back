'use strict';

const schema = require('./material-schema');
const MongooseModel = require('../mongoose-model');

class Material extends MongooseModel {}

module.exports = new Material(schema);