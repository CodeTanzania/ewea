const { error, debug } = require('@lykmapipo/logger');
const { start } = require('./http');

debug('Start Launching Http Server');

// start http server
start((err, { PORT }) => {
  // throw if error
  if (err) {
    error('Fail Launching Http Server', err);
    throw err;
  }

  debug(`Http Server Running At http://0.0.0.0:${PORT}`);

  debug('Finish Launchin Http Server');
});
