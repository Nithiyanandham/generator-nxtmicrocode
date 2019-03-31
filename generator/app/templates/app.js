'use strict';

const config       = require('konfig')({ path: 'config' });
const express      = require('express');
const micro        = require('express-microservice-starter');

const log = require('./lib/logger');

const PORT = process.env.PORT || config.app.server.port;
const SERVICE = config.app.microservice.server.name;

const options = {
  discoverable: true,
  controllersPath: 'lib/controllers',
  monitorsPath: 'lib/monitors',
  correlationHeaderName: 'X-Unity-CorrelationID'
};

const app  = express();

app.use(micro(options));
app.use(require('./lib/express/resource-not-found-middleware'));
app.use(require('./lib/express/error-handler-middleware'));

app.listen(PORT, () => log.info('Initialised [' + SERVICE + '], Port: [' + PORT + ']'));

module.exports = app;
