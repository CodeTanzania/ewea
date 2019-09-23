const { connect } = require('@lykmapipo/mongoose-common');
const { Predefine } = require('@lykmapipo/predefine');
const { Permission } = require('@lykmapipo/permission');
const { Feature } = require('@codetanzania/emis-feature');
const { Role } = require('@codetanzania/emis-role');
const { Party } = require('@codetanzania/emis-stakeholder');

/* export models */
module.exports = {
  connect,
  Predefine,
  Permission,
  Feature,
  Role,
  Party,
};
