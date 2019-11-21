const { debug } = require('@lykmapipo/logger');
const { app, mount, start } = require('@lykmapipo/express-common');

const { predefineRouter } = require('@lykmapipo/predefine');
const { permissionRouter } = require('@lykmapipo/permission');
const { roleRouter } = require('@codetanzania/emis-role');
const { partyRouter } = require('@codetanzania/emis-stakeholder');

const { connect } = require('./database');

debug('Http routers mount started');
mount(predefineRouter, permissionRouter, roleRouter, partyRouter);
debug('Http routers mount finished');

module.exports = { app, start, connect };
