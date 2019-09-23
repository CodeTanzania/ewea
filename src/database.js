const { connect, syncIndexes } = require('@lykmapipo/mongoose-common');
const { Predefine } = require('@lykmapipo/predefine');
const { Permission } = require('@lykmapipo/permission');
const { Feature } = require('@codetanzania/emis-feature');
const { Role } = require('@codetanzania/emis-role');
const { Party } = require('@codetanzania/emis-stakeholder');

module.exports = {
  connect,
  syncIndexes,
  Predefine,
  Permission,
  Feature,
  Role,
  Party,
};
