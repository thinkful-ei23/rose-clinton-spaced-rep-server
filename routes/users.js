'use strict';

const express = require('express');

const User = require('../models/user');
const Scientist = require('../models/scientist');

const router = express.Router();

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {

  /***** Never trust users - validate input *****/
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }

  const stringFields = ['firstName', 'lastName', 'username', 'password'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    const err = new Error(`Field: '${nonStringField}' must be type String`);
    err.status = 422;
    return next(err);
  }

  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    const err = new Error(`Field: '${nonTrimmedField}' cannot start or end with whitespace`);
    err.status = 422;
    return next(err);
  }

  const sizedFields = {
    username: { min: 1 },
    password: { min: 10, max: 72 }
  };

  const tooSmallField = Object.keys(sizedFields).find(
    field => 'min' in sizedFields[field] &&
      req.body[field].trim().length < sizedFields[field].min
  );
  if (tooSmallField) {
    const min = sizedFields[tooSmallField].min;
    const err = new Error(`Field: '${tooSmallField}' must be at least ${min} characters long`);
    err.status = 422;
    return next(err);
  }

  const tooLargeField = Object.keys(sizedFields).find(
    field => 'max' in sizedFields[field] &&
      req.body[field].trim().length > sizedFields[field].max
  );

  if (tooLargeField) {
    const max = sizedFields[tooLargeField].max;
    const err = new Error(`Field: '${tooLargeField}' must be at most ${max} characters long`);
    err.status = 422;
    return next(err);
  }

  // Username and password were validated as pre-trimmed
  let { username, password, firstName, lastName = '' } = req.body;
  firstName = firstName.trim();
  lastName = lastName.trim();

  let spaced_list = [];

  return Scientist.find()
    .then(scientists => {
      scientists.forEach(scientist => {
        spaced_list.push({
          id: scientist.id,
          mValue: 1
        });
      });
      return User.hashPassword(password);
    })
    .then(digest => {
      const newUser = {
        firstName,
        lastName,
        username,
        password: digest,
        spaced_list
      };
      return User.create(newUser);
    })
    .then(result => {
      return res.status(201).location(`/api/users/${result.id}`).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The username already exists');
        err.status = 400;
      }
      next(err);
    });
});

const spaced_list = [
  {
    '_id': '111111111111111111111111',
    'name': 'Katherine Johnson',
    'info': 'Mathematician at NASA.',
    'photo': 'https://upload.wikimedia.org/wikipedia/commons/6/62/Katherine_Johnson_at_NASA%2C_in_1966.jpg'
  },
  {
    '_id': '111111111111111111111112',
    'name': 'Ada Lovelace',
    'info': 'English mathematician regarded as the first computer programmer.',
    'photo': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Ada_Lovelace_portrait_circa_1840.jpg'
  },
  {
    '_id': '111111111111111111111113',
    'name': 'Grace Hopper',
    'info': 'A pioneer of computer programming who invented one of the first compiler related tools.',
    'photo': 'https://upload.wikimedia.org/wikipedia/commons/5/55/Grace_Hopper.jpg'
  }
];

//api/users/questions
router.get('/questions', (req, res, next) => {
  const question = spaced_list.shift();
  spaced_list.push(question);
  res.json(question);
  // const userId = req.user.id;
  // let question;
  // User.find({userId})
  //   .populate('spaced_list')
  //   .then(user => {
  //     if (user) {
  //       question = user.spaced_list.shift();
  //       user.spaced_list.push(question);
  //     } else {
  //       next();
  //     }
  //     return User.findByIdAndUpdate(userId, {spaced_list: user.spaced_list}, { new: true });
  //   })
  //   .then(() => {
  //     if (question) {
  //       res.json(question);
  //     } else {
  //       next();
  //     }
  //   })
  //   .catch(err => {
  //     next(err);
  //   });

});

module.exports = router;
