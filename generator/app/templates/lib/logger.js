'use strict';

const bunyan = require('bunyan');
const config = require('konfig')({ path: 'config' });

const options = { name: config.app.microservice.server.name || 'microservice' };

if (config.app.log && config.app.log.path) {
  options.streams = [
    { type: 'rotating-file', path: config.app.log.path }
  ];
}

module.exports = bunyan.createLogger(options);
