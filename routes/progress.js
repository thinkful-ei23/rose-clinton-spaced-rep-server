'use strict';

const express = require('express');

const Progress = require('../models/progress');

const router = express.Router();

// GET endpoint to get user's progress 
router.get('/',(req,res,next)=>{
  const userId = req.user.id;  //_id or id 

  Progress.findOne({userId})
    .then(progress =>{
      res.json({
        score: progress.score,
        correct: progress.correct,
        incorrect: progress.incorrect});
    })    
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const userId = req.user.id;
  const { correct, incorrect, score } = req.body;

  const newProgress = { correct, incorrect, score };
  Progress.findOneAndUpdate({userId}, newProgress, { new: true })
    .then((result) => {
      console.log(result);
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;