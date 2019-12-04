const { debug } = require('@lykmapipo/logger');
const { app, get, mount, start } = require('@lykmapipo/express-common');
const { apiVersion } = require('@lykmapipo/env');
const { jsonSchema } = require('@lykmapipo/mongoose-common');
const { predefineRouter } = require('@lykmapipo/predefine');
const { permissionRouter } = require('@lykmapipo/permission');
const {
  authenticationRouter,
  partyRouter,
} = require('@codetanzania/emis-stakeholder');
const { eventRouter } = require('@codetanzania/ewea-event');

const { connect } = require('./database');

debug('Start Mounting Http Routers');
get(`/${apiVersion()}/schemas`, (request, response) => {
  const schema = jsonSchema();
  response.status(200);
  response.json(schema);
});
mount(
  authenticationRouter,
  predefineRouter,
  permissionRouter,
  partyRouter,
  eventRouter
);
debug('Finish Mounting Http Routers');

module.exports = { app, start, connect };
