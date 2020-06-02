const { connect, syncIndexes } = require('@codetanzania/ewea-common');
const { Predefine } = require('@lykmapipo/predefine');
const { Permission } = require('@lykmapipo/permission');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Event, EventChangeLog } = require('@codetanzania/ewea-event');
const { VehicleDispatch } = require('@codetanzania/ewea-dispatch');
const { Case } = require('@codetanzania/ewea-case');

module.exports = {
  connect,
  syncIndexes,
  Predefine,
  Permission,
  Party,
  Event,
  EventChangeLog,
  VehicleDispatch,
  Case,
};
