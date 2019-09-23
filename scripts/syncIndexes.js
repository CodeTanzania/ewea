const { waterfall } = require('async');
const { warn, debug } = require('@lykmapipo/logger');
const { connect, syncIndexes } = require('../src/database');

const ensureConnection = next => {
  debug('Sync indexes start');
  return connect(error => next(error));
};

const ensureIndexes = next => {
  debug('Syncing indexes');
  return syncIndexes(next);
};

const tasks = [ensureConnection, ensureIndexes];

waterfall(tasks, (error, results) => {
  if (error) {
    warn('Sync indexes failed', error);
  } else {
    debug('Sync index finished', results);
  }
  process.exit(0);
});
