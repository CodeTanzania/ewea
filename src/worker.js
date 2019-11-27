const { error, debug } = require('@lykmapipo/logger');
const { start, listen } = require('@lykmapipo/postman');
const { connect } = require('./database');

debug('Start Launching Worker');

// connect to database
connect(err => {
  // throw if error
  if (err) {
    error('Fail Launching Worker', err);
    throw err;
  }

  // TODO: worker job events

  // start kue worker
  start();

  // start kue http & ui
  listen();

  debug('Finish Launching Worker');
});
