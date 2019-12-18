const administrativeLevels = require('./administrativelevels');
const eventActions = require('./eventactions');
const eventCertainties = require('./eventcertainties');
const eventIndicators = require('./eventindicators');
const eventFunctions = require('./eventfunctions');
const eventGroups = require('./eventgroups');
const eventSeverities = require('./eventseverities');
const eventStatuses = require('./eventstatuses');
const eventTypes = require('./eventtypes');
const eventUrgencies = require('./eventurgencies');
const featureTypes = require('./featuretypes');
const partyGroups = require('./partygroups');
const partyRoles = require('./partyroles');
const notificationTemplates = require('./notificationtemplates');

const predefines = [
  ...eventIndicators,
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
  ...eventActions,
  ...notificationTemplates,
];

module.exports = predefines;
