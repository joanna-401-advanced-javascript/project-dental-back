'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secret';

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

userSchema.pre('save', async function (){
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.statics.authenticateToken = function (token) {
  try {
    let parsedToken = jwt.verify(token, SECRET);
    let query = { _id: parsedToken.id };
    return this.findOne(query);
  } catch(error) { throw new Error ('Invalid Token'); }
};

userSchema.statics.authenticateBasic = function(auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(error => { throw error; });
};

userSchema.methods.comparePassword = function(password){
  return bcrypt.compare(password, this.password)
    .then(valid => valid? this: null);
};

userSchema.methods.generateToken = function (type) {
  let token = {
    id: this._id,
    capabilities: capabilities[this.role],
    type: type || 'user',
  };
  return jwt.sign(token, SECRET);
};

userSchema.methods.can = function (capability) {
  return capabilities[this.role].includes(capability);
};

module.exports = mongoose.model('users', userSchema);
