const {
  connect: connectDb,
  syncIndexes,
} = require('@lykmapipo/mongoose-common');
const { createModels } = require('@lykmapipo/file');
const { Predefine } = require('@lykmapipo/predefine');
const { Permission } = require('@lykmapipo/permission');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Event, EventChangeLog } = require('@codetanzania/ewea-event');

const connect = done => {
  return connectDb(error => {
    createModels();
    return done(error);
  });
};

module.exports = {
  connect,
  syncIndexes,
  Predefine,
  Permission,
  Party,
  Event,
  EventChangeLog,
};
