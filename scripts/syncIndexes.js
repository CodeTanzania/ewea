const { waterfall } = require('async');
const { warn, debug } = require('@lykmapipo/logger');
const { connect, syncIndexes } = require('../src/database');

const ensureConnection = next => {
  debug('Start Syncing Indexes');
  return connect(error => next(error));
};

const ensureIndexes = next => {
  return syncIndexes(next);
};

const tasks = [ensureConnection, ensureIndexes];

waterfall(tasks, (error, results) => {
  if (error) {
    warn('Fail Syncing Indexes', error);
  } else {
    debug('Finish Syncing Indexes', results);
  }
  process.exit(0);
});
