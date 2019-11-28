const functions = require('./eventfunctions');
const statuses = require('./eventstatuses');
const severities = require('./eventseverities');
const urgencies = require('./eventurgencies');
const certainties = require('./eventcertainties');
const types = require('./eventtypes');
const groups = require('./eventgroups');
const featureTypes = require('./featuretypes');
const administrativeLevels = require('./administrativelevels');
const partyGroups = require('./partygroups');
const partyRoles = require('./partyroles');

const predefines = [
  ...functions,
  ...statuses,
  ...severities,
  ...urgencies,
  ...certainties,
  ...types,
  ...groups,
  ...featureTypes,
  ...administrativeLevels,
  ...partyGroups,
  ...partyRoles,
];

module.exports = predefines;
