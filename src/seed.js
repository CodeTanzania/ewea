const { connect } = require('./database');

// connect to database
connect(error => {
  // throw if error
  if (error) {
    throw error;
  }

  // TODO seed
});
