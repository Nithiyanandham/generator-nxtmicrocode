'use strict';

const ResourceNotFoundError = require('../errors/resource-not-found');

/**
 * Middleware to handle 404s.
 */
module.exports = (req, res, next) => next(new ResourceNotFoundError("Not Found"));
