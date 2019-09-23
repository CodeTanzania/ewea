const { getNumber } = require('@lykmapipo/env');
const { worker, listen } = require('@lykmapipo/postman');
const { connect } = require('./database');

// constants
const KUE_HTTP_PORT = getNumber('KUE_HTTP_PORT');

// connect to database
connect(error => {
  // throw if error
  if (error) {
    throw error;
  }

  // start kue worker
  worker.start();

  // start kue ui
  if (KUE_HTTP_PORT) {
    listen();
  }
});
