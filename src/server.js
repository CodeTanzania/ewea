const { error, debug } = require('@lykmapipo/logger');
const { start } = require('./http');

debug('Server starting');

// start http server
start((err, { PORT }) => {
  // throw if error
  if (err) {
    error('Start start failed', err);
    throw err;
  }

  debug(`Server is running at http://0.0.0.0:${PORT}`);

  debug('Server started');
});
