const { debug } = require('@lykmapipo/logger');
const { app, mount, start } = require('@lykmapipo/express-common');
const { predefineRouter } = require('@lykmapipo/predefine');
const { permissionRouter } = require('@lykmapipo/permission');
const {
  authenticationRouter,
  partyRouter,
} = require('@codetanzania/emis-stakeholder');

const { connect } = require('./database');

debug('Start Mounting Http Routers');
mount(authenticationRouter, predefineRouter, permissionRouter, partyRouter);
debug('Finish Mounting Http Routers');

module.exports = { app, start, connect };
