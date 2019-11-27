const { debug } = require('@lykmapipo/logger');
const { app, mount, start } = require('@lykmapipo/express-common');

const { predefineRouter } = require('@lykmapipo/predefine');
const { permissionRouter } = require('@lykmapipo/permission');
const { roleRouter } = require('@codetanzania/emis-role');
const { partyRouter } = require('@codetanzania/emis-stakeholder');

const { connect } = require('./database');

debug('Start Mounting Http Routers');
mount(predefineRouter, permissionRouter, roleRouter, partyRouter);
debug('Finish Mounting Http Routers');

module.exports = { app, start, connect };
