'use strict';

const express = require('express');

const User = require('../models/user');
const Scientist = require('../models/scientist');
const Progress = require('../models/progress');

const router = express.Router();


// POST endpoint to post user's progress
// router.post('/progress', (req, res, next) => {
//   const { userId } = req.body;
  
//   return Progress.findById({userId})
//     .then(user => {
//       return Progress.create({
//         userId: user._id,
//         score: 0,
//         correct: 0, 
//         incorrect: 0,
//       });
//     })
//     .then(result => {
//       return res.status(201).location('api/users/${result.id}').json(result);
//     })
//     .catch(err => {
//       next(err);
//     });
// }); 




/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {

  /***** Never trust users - validate input *****/
  const requiredFields = ['username', 'password', 'firstName', 'lastName'];
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

  let questions = [];

  return Scientist.find()
    .then(scientists => {
      for(let i = 0; i < scientists.length; i++) {
        questions.push({
          scientist: scientists[i]._id,
          mValue: 1,
          next: i+1
        });
      }
      return User.hashPassword(password);
    })
    .then(digest => {
      const newUser = {
        firstName,
        lastName,
        username,
        password: digest,
        questions
      };
      return User.create(newUser);
    })
    .then(user => {
      Progress.create({
        userId: user._id,
      });
      return user; 
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

module.exports = router;


// const userId = req.user.id; //or const { id } = req.params ?
// const { score, correct, incorrect, percentage } = req.body;
// const updateProgress = { score, correct, incorrect, percentage };
// User.findByIdAndUpdate(userId, updateProgress, {new: true})
//   .then(user => {
//     const score = user.score;
//     const correct = user.numCorrect;
//     const incorrect = user.numIncorrect;
//     const percentage = user.percentage;
//     res.json(score, correct, incorrect, percentage);
//   })
//   .catch(err => {
//     next(err);
//   });