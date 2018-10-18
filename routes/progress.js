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
        correct: progress.numCorrect, 
        incorrect: progress.numIncorrect});
    })    
    .catch(err => {
      next(err);
    });
});

module.exports = router;