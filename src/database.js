const { connect, syncIndexes } = require('@lykmapipo/mongoose-common');
const { Predefine } = require('@lykmapipo/predefine');
const { Permission } = require('@lykmapipo/permission');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Event } = require('@codetanzania/ewea-event');

module.exports = {
  connect,
  syncIndexes,
  Predefine,
  Permission,
  Party,
  Event,
};
