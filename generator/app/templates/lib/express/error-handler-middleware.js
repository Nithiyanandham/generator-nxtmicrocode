'use strict';

const log = require('../logger');

/**
 * Middleware to handler specific application errors.
 */
module.exports = (err, req, res, next) => {
  switch (err.name) {
    // Handle the Error 'ResourceNotFound'
    case 'ResourceNotFoundError':
      res.status(404).json({name: err.name, message: err.message, errors: err.errors});
      break;

    // Handle other Errors here...

    // Default Error handling...
    default:
      log.error(err, 'Uncaught Error');
      res.status(500).json({name: err.name, message: err.message, errors: err.errors});
      break;
  }
};
