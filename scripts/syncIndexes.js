require('@codetanzania/ewea-common');
const { warn, debug } = require('@lykmapipo/logger');
const { syncIndexes } = require('../src/database');

debug('Start Syncing Indexes');

syncIndexes((error, results) => {
  if (error) {
    warn('Fail Syncing Indexes', error);
  } else {
    debug('Finish Syncing Indexes', results);
  }
  process.exit(0);
});
