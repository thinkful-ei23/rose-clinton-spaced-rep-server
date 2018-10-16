'use strict';

const express = require('express');

const User = require('../models/user');

const router = express.Router();

//api/questions
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  let question;
  User.find({_id: userId})
    .populate('spaced_list.scientist')
    .then(([user]) => {
      if (user) {
        question = user.spaced_list.shift();
        user.spaced_list.push(question);
      } else {
        next();
      }
      return User.findByIdAndUpdate(userId, {spaced_list: user.spaced_list}, { new: true });
    })
    .then(() => {
      if (question) {
        res.json(question);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });

});

module.exports = router;
