'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');

const User = require('../models/user');
const Scientist = require('../models/scientist');
const Progress = require('../models/progress');

const seedUsers = require('../db/seed/users');
const seedScientists = require('../db/seed/scientists');
const seedProgresses = require('../db/seed/progresses');

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL)
  .then(() => {
    console.info('Dropping Database');
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([
      Scientist.insertMany(seedScientists),
      // Scientist.createIndexes(),
      User.insertMany(seedUsers),
      // User.createIndexes(),
      Progress.insertMany(seedProgresses),
    ]);
  })
  .then(() => {
    console.info('Disconnecting');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
