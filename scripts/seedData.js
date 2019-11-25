const { waterfall } = require('async');
const { warn, debug } = require('@lykmapipo/logger');
const { connect, syncIndexes, Predefine } = require('../src/database');

const ensureConnection = next => {
  debug('Seeding start');
  return connect(error => next(error));
};

const ensureIndexes = next => {
  debug('Seeding');
  return syncIndexes(error => {
    warn('Ensure Indexes Failed', error);
    next();
  });
};

const seed = next => {
  return Predefine.seed(next);
};

const tasks = [ensureConnection, ensureIndexes, seed];

waterfall(tasks, (error, results) => {
  if (error) {
    warn('Seeding failed', error);
  } else {
    debug('Seeding finished', results);
  }
  process.exit(0);
});
