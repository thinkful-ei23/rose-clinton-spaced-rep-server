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

router.post('/answers', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then(user => {
      const answeredQuestion = user.questions[user.head]; //save value of question at current head
      const answeredQuestionIndex = user.head; //saves location of answered question
      if(req.userAnswer === true) { 
        answeredQuestion.mValue *= 2; //if correct, double the mVal
        
      }    
    });
});

module.exports = router;
