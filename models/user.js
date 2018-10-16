'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// ===== Define UserSchema & UserModel =====
const schema = new mongoose.Schema({
  firstName: { type: String, required: true, default: '' },
  lastName: { type: String, default: '' },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  spaced_list: [{
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Scientist', required: true },
    mValue: { type: Number, required: true, default: 1 }
  }]
});

// Transform output during `res.json(data)`, `console.log(data)` etc.
schema.set('toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

// Note: Use `function` (not an `arrow function`) to allow setting `this`
schema.methods.validatePassword = function (pwd) {
  const currentUser = this;
  return bcrypt.compare(pwd, currentUser.password);
};

schema.statics.hashPassword = function (pwd) {
  return bcrypt.hash(pwd, 10);
};

module.exports = mongoose.model('User', schema);
