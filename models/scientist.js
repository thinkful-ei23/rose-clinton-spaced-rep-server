'use strict';

const mongoose = require('mongoose');

// ===== Define UserSchema & UserModel =====
const schema = new mongoose.Schema({
  name: { type: String, required: true, default: '' },
  info: { type: String, required: true, default: '' },
  photo: { type: String, required: true, default: '' },
  attr: { type: String, required: true, default: '' },
  link: { type: String, default: '' },
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

module.exports = mongoose.model('Scientist', schema);
