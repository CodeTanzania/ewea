const { seed } = require('@codetanzania/ewea-common');
const { waterfall } = require('async');
const { warn, debug } = require('@lykmapipo/logger');
require('../src/database');

debug('Start Seeding Data');

const tasks = [seed];

waterfall(tasks, error => {
  if (error) {
    warn('Fail Seeding Data', error);
  } else {
    debug('Finish Seeding Data');
  }
  process.exit(0);
});
