'use strict';

const functions = require('./eventfunctions');
const statuses = require('./eventstatuses');
const severities = require('./eventseverities');
const urgencies = require('./eventurgencies');
const certainties = require('./eventcertainties');

const predefines = [
  ...functions,
  ...statuses,
  ...severities,
  ...urgencies,
  ...certainties,
];

module.exports = predefines;
