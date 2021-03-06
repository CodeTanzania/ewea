const units = require('./units');
const administrativeLevels = require('./administrativelevels');
const featureTypes = require('./featuretypes');
const eventIndicators = require('./eventindicators');
const eventTopics = require('./eventtopics');
const eventCertainties = require('./eventcertainties');
const eventLevels = require('./eventlevels');
const eventSeverities = require('./eventseverities');
const eventStatuses = require('./eventstatuses');
const eventUrgencies = require('./eventurgencies');
const eventGroups = require('./eventgroups');
const eventTypes = require('./eventtypes');
const eventQuestions = require('./eventquestions');
const partyGroups = require('./partygroups');
const partyRoles = require('./partyroles');
const eventFunctions = require('./eventfunctions');
const eventActions = require('./eventactions');
const administrativeAreas = require('./administrativeareas');
const eventActionCatalogues = require('./eventactioncatalogues');
const notificationTemplates = require('./notificationtemplates');

const predefines = [
  ...units,
  ...administrativeLevels,
  ...featureTypes,
  ...eventIndicators,
  ...eventTopics,
  ...eventLevels,
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
  ...administrativeAreas,
  ...eventActionCatalogues,
  ...notificationTemplates,
];

module.exports = predefines;
