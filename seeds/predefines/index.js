'use strict';

const functions = require('./eventfunctions');
const statuses = require('./eventstatuses');

const predefines = [...functions, ...statuses];

module.exports = predefines;
