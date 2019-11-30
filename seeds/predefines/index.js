const administrativeLevels = require('./administrativelevels');
const eventCertainties = require('./eventcertainties');
const eventFunctions = require('./eventfunctions');
const eventGroups = require('./eventgroups');
const eventSeverities = require('./eventseverities');
const eventStatuses = require('./eventstatuses');
const eventTypes = require('./eventtypes');
const eventUrgencies = require('./eventurgencies');
const featureTypes = require('./featuretypes');
const partyGroups = require('./partygroups');
const partyRoles = require('./partyroles');

const predefines = [
  ...eventFunctions,
  ...eventStatuses,
  ...eventSeverities,
  ...eventUrgencies,
  ...eventCertainties,
  ...eventTypes,
  ...eventGroups,
  ...featureTypes,
  ...administrativeLevels,
  ...partyGroups,
  ...partyRoles,
];

module.exports = predefines;
