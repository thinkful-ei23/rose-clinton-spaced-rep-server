'use strict';

const express = require('express');

const User = require('../models/user');

const router = express.Router();

const spaced_list = [
  {
    'mValue': 1,
    '_id': '5bc66cbd53afd1369627456e',
    'scientist': {
      'name': 'Grace Hopper',
      'info': 'A pioneer of computer programming who invented one of the first compiler related tools.',
      'photo': 'https://upload.wikimedia.org/wikipedia/commons/5/55/Grace_Hopper.jpg',
      'id': '111111111111111111111113'
    }
  },
  {
    'mValue': 1,
    '_id': '5bc66cbd53afd13696274570',
    'scientist': {
      'name': 'Katherine Johnson',
      'info': 'Mathematician at NASA.',
      'photo': 'https://upload.wikimedia.org/wikipedia/commons/6/62/Katherine_Johnson_at_NASA%2C_in_1966.jpg',
      'id': '111111111111111111111111'
    }
  },
  {
    'mValue': 1,
    '_id': '5bc66cbd53afd1369627456f',
    'scientist': {
      'name': 'Ada Lovelace',
      'info': 'English mathematician regarded as the first computer programmer.',
      'photo': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Ada_Lovelace_portrait_circa_1840.jpg',
      'id': '111111111111111111111112'
    }
  }
];

//api/questions
router.get('/', (req, res, next) => {
  const question = spaced_list.shift();
  spaced_list.push(question);
  res.json(question);
  // const userId = req.user.id;
  // let question;
  // User.find({_id: userId})
  //   .populate('spaced_list.scientist')
  //   .then(([user]) => {
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
