const { connect, syncIndexes } = require('@lykmapipo/mongoose-common');
const { Predefine } = require('@lykmapipo/predefine');
const { Permission } = require('@lykmapipo/permission');
const { Party } = require('@codetanzania/emis-stakeholder');

module.exports = {
  connect,
  syncIndexes,
  Predefine,
  Permission,
  Party,
};
