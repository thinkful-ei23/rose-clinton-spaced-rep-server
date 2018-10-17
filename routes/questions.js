'use strict';

const express = require('express');

const User = require('../models/user');

const router = express.Router();

//api/questions
router.get('/next', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .populate('questions.scientist')
    .then(user => {
      const question = user.questions[user.head];
      res.json(question);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
