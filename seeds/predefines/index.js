'use strict';

const functions = require('./eventfunctions');
const statuses = require('./eventstatuses');
const severities = require('./eventseverities');

const predefines = [...functions, ...statuses, ...severities];

module.exports = predefines;
