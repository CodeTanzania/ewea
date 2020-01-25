require('@codetanzania/ewea-common');
const { waterfall } = require('async');
const { debug } = require('@lykmapipo/logger');
const {
  app,
  get,
  mount,
  start: startHttp,
} = require('@lykmapipo/express-common');
const { apiVersion } = require('@lykmapipo/env');
const { jsonSchema } = require('@lykmapipo/mongoose-common');
const { fileRouter } = require('@lykmapipo/file');
const { predefineRouter } = require('@lykmapipo/predefine');
const { permissionRouter } = require('@lykmapipo/permission');
const {
  authenticationRouter,
  partyRouter,
} = require('@codetanzania/emis-stakeholder');
const {
  eventRouter,
  eventChangeLogRouter,
} = require('@codetanzania/ewea-event');

const { connect } = require('./database');

debug('Start Mounting Http Routers');
get(`/${apiVersion()}/schemas`, (request, response) => {
  const schema = jsonSchema();
  response.status(200);
  response.json(schema);
});
mount(
  authenticationRouter,
  fileRouter,
  predefineRouter,
  permissionRouter,
  partyRouter,
  eventRouter,
  eventChangeLogRouter
);
debug('Finish Mounting Http Routers');

const start = done => {
  return waterfall([next => connect(next), next => startHttp(next)], done);
};

module.exports = { app, start, connect };
