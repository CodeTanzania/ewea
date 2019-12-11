require('@codetanzania/ewea-common');
const { parallel, waterfall } = require('async');
const { warn, debug } = require('@lykmapipo/logger');
const { listPermissions } = require('@lykmapipo/predefine');
const {
  syncIndexes,
  Predefine,
  Permission,
  Party,
  Event,
  EventChangeLog,
} = require('../src/database');
const {
  seedRegions,
  seedDistricts,
  seedWards,
  seedSubWards,
  seedHospitals,
} = require('./seedGeo');

debug('Start Seeding Data');

const seedEvents = done => {
  return waterfall(
    [next => Event.seed(next), (events, next) => EventChangeLog.seed(next)],
    done
  );
};

const seed = next => {
  const seeds = {
    allPermissions: then => Permission.seed(then),
    predefinePermissions: then => Permission.seed(listPermissions(), then),
    predefines: then => Predefine.seed(then),
    regions: then => seedRegions(then),
    districts: then => seedDistricts(then),
    wards: then => seedWards(then),
    subwards: then => seedSubWards(then),
    hospitals: then => seedHospitals(then),
    parties: then => Party.seed(then),
    changelogs: then => seedEvents(then),
  };
  return parallel(seeds, next);
};

const tasks = [syncIndexes, seed];

waterfall(tasks, error => {
  if (error) {
    warn('Fail Seeding Data', error);
  } else {
    debug('Finish Seeding Data');
  }
  process.exit(0);
});
