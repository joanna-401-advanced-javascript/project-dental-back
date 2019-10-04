'use strict';
/**
 * API Server Module
 * @module src/model/user
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('./roles');

const SECRET = process.env.SECRET;
const TOKEN_EXPIRE = process.env.TOKEN_LIFETIME || '120m';

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' , enum: ['admin', 'editor', 'user'] },
});

const capabilities = {
  admin: ['create', 'read', 'update', 'delete'],
  editor: ['create', 'read', 'update'],
  user: ['read'],
};

/**
 * Pre hook uses bcrypt to hash the password, saves the Role Model if it doesn't already exist
 */
userSchema.pre('save', async function (){
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  try {
    let userRole = await Role.findOne({ role: this.role });
    if (!userRole) {
      userRole = new Role({ role: this.role, capabilities: capabilities[this.role] });
      await userRole.save();
    }
  } catch (err) {
    console.error(`ERROR ${err}`);
  }
});

/**
 * Finds a user where a token was used in bearer authentication
 * @method authenticateToken
 * @param token
 * @returns {object|Error}
 */
userSchema.statics.authenticateToken = function (token) {
  try {
    let parsedToken = jwt.verify(token, SECRET);
    let query = { _id: parsedToken.id };
    return this.findOne(query);
  } catch(error) { throw new Error ('Invalid Token'); }
};

/**
 * Finds a user basic authentication was used
 * @method authenticateBasic
 * @param auth
 * @returns {object} - user
 */
userSchema.statics.authenticateBasic = function(auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(error => { throw error; });
};

/**
 * Uses bcrypt to check if password is valid
 * @method comparePassword
 * @param password
 * @returns {object| null}
 */
userSchema.methods.comparePassword = function(password){
  return bcrypt.compare(password, this.password)
    .then(valid => valid? this: null);
};

/**
 * Checks for user capabilities, generates token
 * @method generateToken
 * @param type
 * @returns {*}
 */
userSchema.methods.generateToken = function (type) {
  let token = {
    id: this._id,
    capabilities: capabilities[this.role],
    type: type || 'user',
  };
  // return jwt.sign(token, SECRET);

  let options = {};

  if (TOKEN_EXPIRE) {
    options = { expiresIn: TOKEN_EXPIRE };
  }
  return jwt.sign(token, SECRET, options);
};

/**
 * Checks a user for access controls
 * @method can
 * @param capability
 * @returns {*}
 */
userSchema.methods.can = function (capability) {
  return capabilities[this.role].includes(capability);
};

module.exports = mongoose.model('users', userSchema);
