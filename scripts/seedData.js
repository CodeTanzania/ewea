const { parallel, waterfall } = require('async');
const { warn, debug } = require('@lykmapipo/logger');
const { listPermissions } = require('@lykmapipo/predefine');
const {
  connect,
  syncIndexes,
  Predefine,
  Permission,
  Party,
} = require('../src/database');
const { seedRegions } = require('./seedGeo');

const ensureConnection = next => {
  debug('Start Seeding Data');
  return connect(error => next(error));
};

const ensureIndexes = next => {
  debug('Start Syncing Indexes');
  return syncIndexes((error, results) => {
    if (error) {
      warn('Fail Syncing Indexes', error);
    } else {
      debug('Finish Syncing Indexes', results);
    }
    next();
  });
};

const seed = next => {
  const seeds = {
    allPermissions: then => Permission.seed(then),
    predefinePermissions: then => Permission.seed(listPermissions(), then),
    predefines: then => Predefine.seed(then),
    regions: then => seedRegions(then),
    parties: then => Party.seed(then),
  };
  return parallel(seeds, next);
};

const tasks = [ensureConnection, ensureIndexes, seed];

waterfall(tasks, error => {
  if (error) {
    warn('Fail Seeding Data', error);
  } else {
    debug('Finish Seeding Data');
  }
  process.exit(0);
});
