const units = require('./units');
const administrativeLevels = require('./administrativelevels');
const featureTypes = require('./featuretypes');
const eventIndicators = require('./eventindicators');
const eventCertainties = require('./eventcertainties');
const eventSeverities = require('./eventseverities');
const eventStatuses = require('./eventstatuses');
const eventUrgencies = require('./eventurgencies');
const eventGroups = require('./eventgroups');
const eventTypes = require('./eventtypes');
const eventQuestions = require('./eventquestions');
const eventFunctions = require('./eventfunctions');
const eventActions = require('./eventactions');
const partyGroups = require('./partygroups');
const partyRoles = require('./partyroles');
const notificationTemplates = require('./notificationtemplates');

const predefines = [
  ...units,
  ...administrativeLevels,
  ...featureTypes,
  ...eventIndicators,
  ...eventSeverities,
  ...eventCertainties,
  ...eventStatuses,
  ...eventUrgencies,
  ...eventGroups,
  ...eventTypes,
  ...partyGroups,
  ...partyRoles,
  ...eventQuestions,
  ...eventFunctions,
  ...eventActions,
  ...notificationTemplates,
];

module.exports = predefines;
