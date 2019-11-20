const { error, debug } = require('@lykmapipo/logger');
const { start, listen } = require('@lykmapipo/postman');
const { connect } = require('./database');

debug('Worker starting');

// connect to database
connect(err => {
  // throw if error
  if (err) {
    error('Worker start failed', err);
    throw err;
  }

  // TODO: worker job events

  // start kue worker
  start();

  // start kue http & ui
  listen();

  debug('Worker started');
});
