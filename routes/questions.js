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
      if(req.body.userAnswer === true) {  // checks if userAnswer exists (client sends key of true if correct)
        answeredQuestion.mValue *= 2; //if correct, double the mVal
      } else {
        answeredQuestion.mValue = 1;
      }
      user.head = answeredQuestion.next;

      let currentQuestion = answeredQuestion;
      for (let i = 0; i < answeredQuestion.mValue; i++) {
        if (currentQuestion.next === null) {
          break;
        }
        const nextIndex = currentQuestion.next;
        currentQuestion = user.questions[nextIndex];
      }

      answeredQuestion.next = currentQuestion.next;
      currentQuestion.next = answeredQuestionIndex;
      
      return user.save();
    })
    .then((user) => {
      console.log(user);
      res.sendStatus(204);
    });
});

module.exports = router;
